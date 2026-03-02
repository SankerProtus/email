import { Resend } from "resend";
import {
  getVerificationEmailTemplate,
  getWelcomeEmailTemplate,
} from "./email.templates.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send verification email with 4-digit code using Resend
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

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("✅ Verification email sent via Resend:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Error sending verification email:", error);

    // Fallback mode for development/testing
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.EMAIL_FALLBACK_MODE === "true"
    ) {
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
 * Send welcome email after successful verification using Resend
 * @param {string} email - Recipient email address
 * @param {string} username - User's username
 */
export const sendWelcomeEmail = async (email, username) => {
  try {
    const emailTemplate = getWelcomeEmailTemplate(username);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("✅ Welcome email sent via Resend:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Error sending welcome email:", error);

    // Welcome emails are not critical - don't fail the request
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.EMAIL_FALLBACK_MODE === "true"
    ) {
      console.warn("📧 Welcome email skipped (fallback mode)");
      return { success: true, fallback: true };
    }

    return { success: false, error: error.message };
  }
};

/**
 * Verify Resend API key is valid
 */
export const verifyEmailConnection = async () => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is not set");
      return false;
    }

    // Check if API key format is correct
    if (!process.env.RESEND_API_KEY.startsWith("re_")) {
      console.error(
        "❌ Invalid RESEND_API_KEY format (should start with 're_')",
      );
      return false;
    }

    console.log("✅ Resend API key configured");
    return true;
  } catch (error) {
    console.error("❌ Resend verification failed:", error);
    return false;
  }
};
