const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    console.log('***** get all users *******');   
    const users = await User.query().select();
    res.json(users);
});

router.post('/users/login', async (req, res) => {
    console.log('***** login *******');   
    const validUser = await User.query().select().where({ email: req.body.email });
    console.log(validUser);
    if(validUser.length > 0){
        res.status(200).json({message: "You have been logged in"});
    } else {
        res.status(400).json({message: "Something went wrong"});
    }
});

router.post('/users/signup', async (req, res) => {
    console.log('***** signup *******');
    // console.log(req.body);
    if(req.body.email && req.body.password){        
        const newUser = {
            email: req.body.email,
            password: req.body.email
        }

        const user = await User.query().insert(newUser);
        res.status(200).json({ message: user });

    } else {
        res.status(400).json({ response: "missing password" });
    }
});

module.exports = router;