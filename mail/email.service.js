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
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
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
    
    // In development or when email fails, log the code
    if (process.env.NODE_ENV !== "production" || process.env.EMAIL_FALLBACK_MODE === "true") {
      console.warn("📧 EMAIL FALLBACK MODE:");
      console.warn(`   Email: ${email}`);
      console.warn(`   Verification Code: ${verificationCode}`);
      console.warn(`   Username: ${username}`);
      return { success: true, fallback: true };
    }
    
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
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
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
    
    // In development or fallback mode, just log
    if (process.env.NODE_ENV !== "production" || process.env.EMAIL_FALLBACK_MODE === "true") {
      console.warn("📧 Welcome email skipped (fallback mode)");
      return { success: true, fallback: true };
    }
    
    // Don't throw error for welcome emails - they're not critical
    return { success: false, error: error.message };
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
