import express from 'express';
import nodemailer from 'nodemailer';


export default {
    post : _post
}

function _post(req, res) {
    const to = req.body.to;
    const data = req.body.data;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.cryptospacex.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'shubham@cryptospacex.com', // generated ethereal user
                pass: 'vara4321' // generated ethereal password
            },
            tls: {
                rejectUnauthorized:false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"shubham contact" <shubham@cryptospacex.com>', // sender address
            to: to, // list of receivers
            subject: 'first mail from nodemailer', // Subject line
            text: 'Open link to set password', // plain text body
            html: `
                This is your link to<br/>
                <h3>click to set password</h3><br/>
                <h1 style="color:blue"><a>crypospacex/setpassword/:95743967395437997#@%36@262</a></h1>
            ` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.json({info})

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

 