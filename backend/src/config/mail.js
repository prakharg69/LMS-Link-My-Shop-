import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();
export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  }, 
});

