// user router

const express = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); // for encryption
const jwt = require('jsonwebtoken'); // for jwt tokens
const rateLimit = require('express-rate-limit'); // for limiting login attempts
const {ObjectId} = require('mongodb'); // mongo stores _ids as objects

// is this production?
const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  path: '/',
};

module.exports = function (db) {
    const router = express.Router();
    const users = db.collection('users');
    users.createIndex({email: 1}, {unique: true}); // make sure all emails are unique
    const tasks = db.collection('tasks');

    // POST route for registering
    router.post('/register', 
      // validate and sanitize user inputs
      body('name').trim().escape().notEmpty().withMessage('Name is required')
                  .matches(/^[a-zA-Z\s\-']+$/).withMessage('Name contains invalid characters'),
      body('email').trim().isEmail().normalizeEmail().withMessage('Invalid email'),
      body('password').trim().notEmpty().withMessage('Password is required')
                      .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
                      .isString().withMessage('Password must be a string'),
      body('cpassword').trim().custom((value, {req}) => {
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

        // check if this email is already in use
        const existingUser = await users.findOne({email});
        if(existingUser){
          return res.status(400).json({error: 'email already in use'});
        }

        try {
            // hash the password
            const hashedPW = await bcrypt.hash(password, 10);
            const newUser = { name, email, password: hashedPW };

            // insert the new user into the db
            const result = await users.insertOne(newUser);
            newUser._id = result.insertedId;

            // generate token
            const accessToken = jwt.sign({userId: newUser._id, email: newUser.email}, 
              process.env.JWT_SECRET, {expiresIn: '1h'});
            const refreshToken = jwt.sign({userId: newUser._id}, process.env.JWT_REFRESH);
            const hashedToken = await bcrypt.hash(refreshToken, 10);

            await users.updateOne({_id: newUser._id}, {$set: {refreshToken: hashedToken}});
            res.cookie('refreshToken', refreshToken, refreshCookieOptions);

            res.status(201).json({ message: 'user created', accessToken: accessToken});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'error saving data'});
        }
    });

    // rate limiter for login attempts
    const loginLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 min
      max: 3, // limits to 3 attempts
      message: 'Too many login attempts. Please try again in 15 minutes.'
    });

    // POST route for logging in
    router.post('/login', loginLimiter,
      // validate user inputs
      body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
      body('password').trim().notEmpty().withMessage('Password is required')
                      .isString().withMessage('Password must be a string'),
      async (req, res) => {
        // return all validation errors if there are any
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
        }

        console.log(req.body);

        // separate components
        const {email, password} = req.body;

        try {
            // find the user
            const user = await users.findOne({email});
            if (!user) {
                return res.status(401).json({error: 'user does not exist' });
            }

            // check if the password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({error: 'invalid credentials' });
            }

            // generate tokens
            const accessToken = jwt.sign({userId: user._id, email: user.email}, 
              process.env.JWT_SECRET, {expiresIn: '1h'});

            const refreshToken = jwt.sign({userId: user._id}, 
              process.env.JWT_REFRESH, {expiresIn: '7d'});

            // hash and then update refresh token
            const hashedToken = await bcrypt.hash(refreshToken, 10);
            await users.updateOne({_id: user._id}, {$set: {refreshToken: hashedToken}});

            res.cookie('refreshToken', refreshToken, refreshCookieOptions);

            res.status(200).json({message: 'login successful', accessToken});
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'error retrieving data'});
        }
    });

    // create a new access token when the refresh token is valid
    router.post('/refresh', async(req, res) => {
      const refreshToken = req.cookies.refreshToken;

      if(!refreshToken){
        return res.status(401).json({error: 'no token provided'});
      }

      try{
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        
        const user = await users.findOne({_id: payload.userId});
        if(!user){
          return res.status(403).json({error: 'invalid token'});
        }

        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if(!isMatch){
          return res.status(403).json({error: 'invalid token'});
        }

        const newAccessToken = jwt.sign({userId: user._id, email: user.email},
          process.env.JWT_SECRET, {expiresIn: '1h'}
        );

        const newRefreshToken = jwt.sign({userId: user._id},
          process.env.JWT_REFRESH, {expiresIn: '7d'}
        );

        const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
        await users.updateOne({_id: user._id}, {$set: {refreshToken: hashedRefreshToken}});

        res.cookie('refreshToken', newRefreshToken, refreshCookieOptions);

        res.json({accessToken: newAccessToken});
      } catch(err){
        console.error(err);
        return res.status(403).json({error: 'invalid refresh token'});
      }
    });

    // remove the refresh token when logging out
    router.post('/logout', async(req, res) => {
      console.log('Cookies:', req.cookies);
      const refreshToken = req.cookies.refreshToken;

      if(!refreshToken){
        return res.sendStatus(204);
      }

      try{
        // get the user id from the refresh token
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        const user = await users.findOne({_id: new ObjectId(payload.userId)});

        if(!user || !user.refreshToken){
          return res.sendStatus(204);
        }

        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if(!isMatch){
          return res.sendStatus(204);
        }

        // clear the stored refresh token
        await users.updateOne({_id: user._id}, {$unset: {refreshToken: ''}});
        res.clearCookie('refreshToken', clearCookieOptions);

        res.sendStatus(204);
      } catch(err){
        console.error(err);
        return res.sendStatus(204);
      }
    });

    router.post('/data', async (req, res) => {
        console.log("dashboard queried");
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
          return res.status(401).json({error: 'access token required'});
        }

        try{
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decoded.userId;
          const taskCursor = await tasks.find({userId: new ObjectId(userId)});
          const userTasks = await taskCursor.toArray();

          console.log('user id:', userId);
          console.log('task:', userTasks);

          res.status(200).json({tasks: userTasks});
        } catch(err){
          console.error(err);
          return res.status(500).json({error: 'failed to get tasks'});
        }
    });

    return router;
};
