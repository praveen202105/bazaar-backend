import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
console.log("hh",process.env.EMAIL_USERNAME);
console.log("jjj",process.env.EMAIL_PASSWORD);


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

  auth: {
    user: process.env.EMAIL_USERNAME, // Your email
    pass: process.env.EMAIL_PASSWORD   // Your email password or app-specific password
  }
});

export default transporter;
