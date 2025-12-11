import nodemailer from 'nodemailer';
import "dotenv/config"

const credentials = {
    service: "gmail", // dùng service cho gọn
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // dùng EMAIL_PASS, không còn EMAIL_KEY
    },
};

const transporter = nodemailer.createTransport(credentials);

export default transporter;