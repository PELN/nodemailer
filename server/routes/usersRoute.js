const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    console.log('***** users route *******');
    // const users = await users.query().select();
    const newUser = {
        email: "test2@mail.com"
    };
    await User.query().insert(newUser);
    const users = await User.query().column('email').select();
    res.json(users);
});

// create a new user with post
// router.post('/users/signup', async (req, res) => {
//     console.log(req.body.email);
//     // todo validate the input
//     if(req.body.email && req.body.password) {
        
//         const newUser = {
//             email: req.body.email,
//             password: req.body.password
//         }
//         // insert user
//         const user = await User.query().insert(newUser);
//         res.status(200).json({message: user});
//     } else {
//         res.status(400).json({response: "Missing password"});
//     }
// });


// Check if post is working
router.post('/users/login', async (req, res) => {
    console.log(req.body)
    res.json({});
});


module.exports = router;