import { transporter } from "./transporter.js";
import {
  getVerificationEmailTemplate,
  getWelcomeEmailTemplate,
} from "./email.templates.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/**
 * Send verification email with 4-digit code
 * @param {string} email - Recipient email address
 * @param {string} verificationCode - 4-digit verification code
 * @param {string} username - User's username
 */
export const sendVerificationEmail = async (
  email,
  verificationCode,
  username,
) => {
  try {
    const emailTemplate = getVerificationEmailTemplate(
      verificationCode,
      username,
    );

    const mailOptions = {
      from:
        process.env.EMAIL_FROM,
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

/**
 * Send welcome email after successful verification
 * @param {string} email - Recipient email address
 * @param {string} username - User's username
 */
export const sendWelcomeEmail = async (email, username) => {
  try {
    const emailTemplate = getWelcomeEmailTemplate(username);

    const mailOptions = {
      from:
        process.env.EMAIL_FROM,
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

/**
 * Verify email transporter connection
 */
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Email server is ready to send messages");
    return true;
  } catch (error) {
    console.error("Email server verification failed:", error);
    return false;
  }
};
