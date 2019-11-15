const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
    console.log('***** users route *******');
    // const users = await users.query().select();
    res.json([]);
});

module.exports = router;