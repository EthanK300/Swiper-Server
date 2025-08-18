const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const { MongoClient } = require("mongodb");
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cookieParser());

// is this production?
const isProduction = process.env.NODE_ENV === 'production';

// set origin
app.use(cors({
    origin: isProduction ? process.env.CORS_ORIGIN : 'http://localhost:3000',
    credentials: true
}));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try{
        await client.connect();
        const database = client.db('test');
        database == null ? console.log("null db") : console.log("good db");
        return database;
    }catch(err){
        console.log("error" + err);
    }
}

(async () => {
    const db = await run();

    if(!db){
        console.error('connection failed');
        process.exit(1);
    }else{
        console.log('database connected');
    }

    // create a unique index for emails
    const users = db.collection('users');
    try{
        await users.createIndex({email: 1}, {unique: true});
    } catch(err){
        console.error('error creating unique index:', err);
    }

    // pass the api connections to router
    const router = require('./router')(db);
    app.use('/api', router);

    const PORT = process.env.PORT || 8000;
    const IP = process.env.IP || 'localhost';

    // static files from React
    app.use(express.static(path.join(__dirname, '../client/build/')));

    // landing page
    app.get('/', (req, res) => {
        console.log("sending react stuff");
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    // catch-all route
    app.use((req, res) => {
        const urlPath = path.join(__dirname, '../client/build', 'index.html');
        console.log("sending catch-all in response to request: " + req.url);
        res.sendFile(urlPath);
    });

    app.listen(PORT, IP, () => {
    console.log(`server is running at http://${IP}:${PORT}`);
    });
})();

// close the connection when done
process.on('SIGINT', async() => {
    console.log('\nClosing connection...');
    await client.close();
    process.exit(0);
});