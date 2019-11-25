const router = require('express').Router();
// const User = require('../models/User');
const Email = require('../models/Email');
const nodemailer = require('nodemailer');

router.get('/emails', async (req, res) => {
    console.log('***** get all emails ******');
    const emails = await Email.query().select();
    res.json(emails);
    console.log(req.body)
});


router.post('/emails/send', async (req, res) => {
    console.log('***** send email *******');
    console.log(req.body);

    if(req.body.subject && req.body.message){

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'peryagtest@gmail.com',
                pass: 'peryag888'
            }
        });
        
        const mailOptions = {
            from: 'peryagtest@gmail.com', // sender address
            to: 'peryagtest@gmail.com', // list of receivers
            subject: req.body.subject, // Subject line
            html: req.body.message // plain text body
        };
        
        const email = await Email.query().insert(mailOptions);
        res.status(200).json({ message: email });

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err);
            else
                console.log(info);
        });
    
    } else {
        res.status(400).json({ message: "something is missing" });
    }

});


module.exports = router;



