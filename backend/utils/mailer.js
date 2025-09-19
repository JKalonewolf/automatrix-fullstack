const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create reusable transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // you can change to any email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send Email Function
const sendEmail = async (to, subject = "AutoMatrix Notification", text = "") => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (err) {
        console.error("Email error:", err);
        return false;
    }
};

module.exports = sendEmail;
