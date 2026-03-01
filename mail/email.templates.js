/**
 * Generate verification email template with 4-digit code
 * @param {string} code - 4-digit verification code
 * @param {string} username - User's username
 */
export const getVerificationEmailTemplate = (code, username) => {
  return {
    subject: "Verify Your PayFlow Analytics Account",
    text: `Hello ${username},\n\nThank you for registering with PayFlow Analytics!\n\nYour verification code is: ${code}\n\nThis code will expire in 15 minutes.\n\nIf you didn't create an account, please ignore this email.\n\nBest regards,\nPayFlow Analytics Team`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">PayFlow Analytics</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Subscription Analytics Made Easy</p>
          </div>

          <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">Welcome, ${username}!</h2>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
              Thank you for registering with PayFlow Analytics. To complete your registration, please use the verification code below:
            </p>

            <div style="background-color: #f9fafb; border: 2px dashed #3b82f6; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
              <div style="font-size: 36px; font-weight: bold; color: #3b82f6; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${code}
              </div>
            </div>

            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 4px;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                ⏰ This code will expire in <strong>15 minutes</strong>
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0;">
              If you didn't create an account with PayFlow Analytics, please ignore this email or contact our support team if you have concerns.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
              © ${new Date().getFullYear()} PayFlow Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

/**
 * Generate welcome email template
 * @param {string} username - User's username
 */
export const getWelcomeEmailTemplate = (username) => {
  return {
    subject: "Welcome to PayFlow Analytics! 🎉",
    text: `Hello ${username},\n\nWelcome to PayFlow Analytics!\n\nYour account has been successfully verified. You can now start tracking and analyzing your subscription analytics.\n\nGet started by logging in to your dashboard.\n\nBest regards,\nPayFlow Analytics Team`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to PayFlow Analytics</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Welcome!</h1>
          </div>

          <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">Hi ${username},</h2>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Your account has been successfully verified! Welcome to PayFlow Analytics.
            </p>

            <div style="background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%); border-radius: 8px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #3b82f6; margin: 0 0 15px 0;">What's Next?</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Set up your subscription tracking</li>
                <li style="margin-bottom: 10px;">Connect your payment providers</li>
                <li style="margin-bottom: 10px;">Explore analytics dashboard</li>
                <li>Customize your reports</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/login" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Go to Dashboard
              </a>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
              Need help getting started? Check out our <a href="#" style="color: #3b82f6; text-decoration: none;">documentation</a> or contact support.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
              © ${new Date().getFullYear()} PayFlow Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};
