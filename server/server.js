console.log("initializing");

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const {MongoClient} = require("mongodb");

dotenv.config();
app.use(cors());
app.use(express.json());

// placed password in .env
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
    }

    // create a unique index for emails
    const users = db.collection('users');
    try{
        await users.createIndex({email: 1}, {unique: true});
    } catch(err){
        console.error('error creating unique index:', err);
    }

    // pass the db connection to router
    const router = require('./router')(db);
    app.use('/api', router);

    const PORT = process.env.PORT || 8000;
    const IP = process.env.IP || 'localhost';


    // static files from React
    app.use(express.static(path.join(__dirname, '../client/build/')));

    app.get('/', (req, res) => {
        console.log("sending react stuff");
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    app.get('/request', (req, res) => {
        console.log("received a request");
        res.status(200).json({
            text: "some text",
        });
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