import nodemailer from "nodemailer";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
  // Force IPv4 to avoid Railway IPv6 issues
  family: 4,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});
