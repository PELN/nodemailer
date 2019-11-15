const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    console.log('***** users route *******');
    // const users = await users.query().select();
    // const newUser = {
    //     email: "test2@mail.com"
    // };
    // await User.query().insert(newUser);
    // const users = await User.query().column('email').select();
    const users = await User.query().select();
    res.json(users);
});


router.post('/users/signup', async (req, res) => {
    console.log('***** signup *******');
    if(req.body.username && req.body.password){
        console.log(req.body);
        
    
    }

});


module.exports = router;