import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  verifyEmailConnection,
} from "./mail/email.service.js";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
const users = new Map();
const verificationCodes = new Map();

// Helper function to generate 4-digit verification code
const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
console.log("Generated verification code:", generateVerificationCode());

// Helper function to check if verification code is expired (15 minutes)
const isCodeExpired = (timestamp) => {
  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  return Date.now() - timestamp > FIFTEEN_MINUTES;
};

// Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: `Server is running on port http://localhost:${PORT}` });
});

// Register endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    if (users.has(email)) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Store user (unverified)
    users.set(email, {
      username,
      email,
      password: hashedPassword,
      verified: false,
      createdAt: new Date(),
    });

    // Store verification code with timestamp
    verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now(),
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode, username);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification code.",
      email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during registration" });
  }
});

// Verify email endpoint
app.post("/api/verify-email", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || code.length !== 4) {
      return res
        .status(400)
        .json({ message: "Invalid verification code format" });
    }

    // Find user with this verification code
    let userEmail = null;
    for (const [email, codeData] of verificationCodes.entries()) {
      if (codeData.code === code) {
        userEmail = email;
        break;
      }
    }

    if (!userEmail) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Check if code is expired
    const codeData = verificationCodes.get(userEmail);
    if (isCodeExpired(codeData.timestamp)) {
      verificationCodes.delete(userEmail);
      return res
        .status(400)
        .json({
          message: "Verification code has expired. Please request a new one.",
        });
    }

    // Get user
    const user = users.get(userEmail);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mark user as verified
    user.verified = true;
    user.verifiedAt = new Date();
    users.set(userEmail, user);

    // Remove verification code
    verificationCodes.delete(userEmail);

    // Send welcome email
    await sendWelcomeEmail(userEmail, user.username);

    res.json({
      message: "Email verified successfully",
      user: {
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during verification" });
  }
});

// Resend verification code endpoint
app.post("/api/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = users.get(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already verified
    if (user.verified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();

    // Update verification code
    verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now(),
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode, user.username);

    res.json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error("Resend verification error:", error);
    res
      .status(500)
      .json({
        message: "Internal server error while resending verification code",
      });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Get user
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if verified
    if (!user.verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
});

// Serve static files from frontend/dist in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const startServer = async () => {
  try {
    // Verify email connection
    const emailReady = await verifyEmailConnection();
    if (!emailReady) {
      console.warn(
        "⚠️ Email service is not ready. Email functionality may not work.",
      );
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on: http://localhost:${PORT}`);
      console.log(
        `📧 Email service status: ${emailReady ? "Ready ✅" : "Not Ready ❌"}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
