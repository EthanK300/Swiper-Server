console.log("initializing");

const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const {MongoClient} = require("mongodb");

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri);

async function run() {
    try{
        await client.connect();
        const database = client.db('test');
        database == null ? console.log("null db") : console.log("good db");
    }catch(err){
        console.log("error" + err);
    }finally{

    }
}

run();

dotenv.config();

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