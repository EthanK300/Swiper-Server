// user router

const express = require('express');
const bcrypt = require('bcrypt');

module.exports = function (db) {
    const router = express.Router();
    const users = db.collection('users');

    // POST route for registering
    router.post('/register', async (req, res) => {
        try {
            console.log(req.body);

            // separate the components
            const { name, email, password, cpassword } = req.body;

            // validation
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Name is required and must be a string' });
            }
            if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            if (password != cpassword) {
                return res.status(400).json({ error: 'passwords do not match' });
            }

            // hash the password
            const hashedPW = await bcrypt.hash(password, 10);
            const newUser = { name, email, password: hashedPW };

            // insert the new user into the db
            const result = await users.insertOne(newUser);

            res.status(201).json({ message: 'user created', id: result.insertedId });
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({ error: 'email already in use' });
            } else {
                res.status(500).json({ error: 'error saving data' });
            }
        }
    });

    // POST route for logging in
    router.post('/login', async (req, res) => {
        try {
            console.log(req.body);

            // separate components
            const { email, password } = req.body;

            // find the user
            const user = await users.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'user does not exist' });
            }

            // check if the password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'invalid credentials' });
            }

            // token
            // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'login successful' });
        } catch (err) {
            res.status(500).json({ error: 'error retrieving data' });
        }
    });

    return router;
};
