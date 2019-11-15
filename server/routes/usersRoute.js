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

module.exports = router;