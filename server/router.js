// user router

const express = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); // for encryption
const jwt = require('jsonwebtoken'); // for jwt tokens

module.exports = function (db) {
    const router = express.Router();
    const users = db.collection('users');

    // POST route for registering
    router.post('/register', 
      // validate and sanitize user inputs
      body('name').trim().escape().notEmpty().withMessage('Name is required'),
      body('email').trim().isEmail().normalizeEmail().withMessage('Invalid email'),
      body('password').notEmpty().withMessage('Password is required')
                      .isString().withMessage('Password must be a string'),
      body('cpassword').custom((value, {req}) => {
        if(value !== req.body.password){
          throw new Error('Passwords do not match');
        }
        return true;
      }),      
      async (req, res) => {
        // return all validation errors if there are any
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
        }

        console.log(req.body);

        // separate the components
        const {name, email, password} = req.body;

        try {
            // hash the password
            const hashedPW = await bcrypt.hash(password, 10);
            const newUser = { name, email, password: hashedPW };

            // insert the new user into the db
            const result = await users.insertOne(newUser);

            // generate token
            const token = jwt.sign({userId: newUser._id, email: newUser.email}, 
              process.env.JWT_SECRET, {expiresIn: '1h'});
              console.log(token);

            res.status(201).json({ message: 'user created', token: token });
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({ error: 'email already in use' });
            } else {
                res.status(500).json({ error: 'error saving data' });
            }
        }
    });

    // POST route for logging in
    router.post('/login', 
      // validate user inputs
      body('email').isEmail().withMessage('Invalid email'),
      body('password').notEmpty().withMessage('Password is required')
                      .isString().withMessage('Password must be a string'),
      async (req, res) => {
        // return all validation errors if there are any
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
        }

        console.log(req.body);

        // separate components
        const { email, password } = req.body;

        try {
            // find the user
            const user = await users.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'user does not exist' });
            }

            console.log('Password value and type:', password, typeof password);

            // check if the password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'invalid credentials' });
            }

            // generate token
            const token = jwt.sign({userId: user._id, email: user.email}, 
              process.env.JWT_SECRET, {expiresIn: '1h'});
              console.log(token);

            res.status(200).json({message: 'login successful', token: token});
        } catch (err) {
            res.status(500).json({error: 'error retrieving data'});
        }
    });

    router.post('/data', (req, res) => {
        console.log("dashboard queried");
        if (req.body.token) {
            console.log("found a token");
        }
        res.status(200).send("received /data request");
    });

    return router;
};
