const router = require('express').Router();
// const User = require('../models/User');
const Email = require('../models/Email');

router.get('/emails', async (req, res) => {
    console.log('***** get all emails ******');
    const emails = await Email.query().select();
    res.json(emails);
});


router.post('/emails/send', async (req, res) => {
    console.log('***** send email *******');
    console.log(req.body);
   
    if(req.body.subject && req.body.message){
        const newEmail = {
            subject: req.body.subject,
            message: req.body.message
        }
        const email = await Email.query().insert(newEmail);
        res.status(200).json({ message: email });
    } else {
        res.status(400).json({ message: "something is missing" });
    }

});



module.exports = router;



