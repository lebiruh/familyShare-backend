
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import { getDbUser } from "../services/dbUserByEmail.services.js";


// var nodemailer = require('nodemailer');

dotenv.config();



export const confirmEmail = async (req, res) => {
    try {
        const { email } = req.body;

        //CHECK if USER EXISTS

        const data = await getDbUser(email);
      
        if(data.length > 0) return res.status(409).json("User already exists!");

        let passCode = Math.floor(100000 + (Math.random() * 900000))

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        var mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Your email confirmation code',
          html: `<p>Hereunder is your six digit email confirmation code.</p> <p><b>${passCode}</b></p>`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
        return res.status(200).json({message: "Password reset link has been sent to your email address....", passCode});
    } catch (error) {
       return res.status(500).json({message:error.message});
    }
};
