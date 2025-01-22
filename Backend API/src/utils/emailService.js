const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { jwtSecret } = require('../config/jwt');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendResetPasswordEmail = async (email, token) => {
  // Create the reset link with the token
  const resetLink = `http://localhost:4200/reset-password?token=${token}`;
  
  const mailOptions = {
    from: 'noreply@online_shopping.com',
    to: email,
    subject: 'Password Reset Request for Online Shopping System',
    html: `
      <p>Hello,</p>
      <p>We received a request to reset your password for your account in our online shopping system project. If you did not request this, please ignore this email.</p>
      <p>If you would like to reset your password, please click the link below:</p>
      <p><a href="${resetLink}">Reset your password</a></p>
      <p>This link will expire in one hour for your security. After clicking the link, you will be prompted to enter a new password.</p>
      <p>Thank you,<br>The Online Shopping System Team</p>
    `
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };
