const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/users', async (req, res) => {
    console.log('***** get all users *******');   
    const users = await User.query().select();
    res.json(users);
});

router.post('/users/login', async (req, res) => {
    console.log('***** login *******');   
    const validEmail = await User.query().select().where({ email: req.body.email });
    const validPassword = await User.query().select().where({ password: req.body.password });
    // console.log(validEmail);

    if(validEmail.length > 0 && validPassword.length > 0){
        // res.status(200).json({ message: "You have been logged in" });
        const authEmail = await User.query().select().where({ email: req.body.email });
        // pass secret token to jwt.io in verify signature
        const token = jwt.sign({email: authEmail[0].email}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ auth: true, token: token, user: authEmail });
        console.log('**** TOKEN *****', token);
        console.log('***** Auth email *****', authEmail);
    } else {
        res.status(401).send({ auth: false, token: null });
        console.log('unauthorized, something went wrong');
        // res.status(401).json({ message: "Something went wrong - unauthorized" });
    };
});

router.post('/users/signup', async (req, res) => {
    console.log('***** signup *******');
    console.log(req.body);
    const usersEmail = await User.query().select().where({ email: req.body.email });
    
    if (usersEmail.length > 0){
        console.log('user already exist')
        res.status(400).json({ message: "Email already exist" });
    } else {
        if(req.body.email && req.body.password){        
            const newUser = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.query().insert(newUser);
            res.status(200).json({ message: user });
        } else {
            res.status(400).json({ response: "Something is missing" });
        };
    };
});

module.exports = router;