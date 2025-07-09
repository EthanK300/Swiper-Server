const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8000;

console.log("initializing");

// static files from React
app.use(express.static(path.join(__dirname, '../client/build/')));

app.get('/', (req, res) => {
    console.log("sending react stuff");
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});