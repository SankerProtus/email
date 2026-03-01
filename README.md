# PayFlow Analytics - Email Verification System

A full-stack email verification system built with React, Express, and Nodemailer. This project demonstrates user registration with email verification using 4-digit codes sent via email.

## 🚀 Features

- **User Registration**: Users can register with username, email, and password
- **Email Verification**: 4-digit verification codes sent to user's email
- **Email Templates**: Beautiful HTML email templates for verification and welcome emails
- **Resend Functionality**: Users can request a new verification code
- **Code Expiration**: Verification codes expire after 15 minutes
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Validation**: Form validation and error handling

## 📁 Project Structure

```
Email/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.jsx        # Registration form
│   │   │   └── verifyAccount.jsx   # Email verification form
│   │   ├── App.jsx          # Main app component with routing
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js       # Vite configuration with API proxy
├── mail/                    # Email functionality
│   ├── email.service.js     # Email sending functions
│   ├── email.templates.js   # HTML email templates
│   └── transporter.js       # Nodemailer configuration
├── server.js                # Express backend server
├── package.json
└── .env                     # Environment variables (not in git)
```

## 🛠️ Technologies Used

### Frontend

- React 19.2.0
- React Router DOM 7.13.1
- Axios 1.13.6
- Lucide React (icons)
- Vite 7.3.1
- Tailwind CSS

### Backend

- Node.js
- Express 4.21.2
- Nodemailer 8.0.1
- bcryptjs 2.4.3
- CORS 2.8.5
- dotenv 17.3.1

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for sending emails) or other email service
- Google Cloud Console account (for OAuth2 credentials)

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd Email
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory (or copy `.env.example`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_FROM="PayFlow Analytics <noreply@payflow.com>"
EMAIL_HOST=gmail

# Google OAuth2 Configuration
EMAIL_USER=your-email@gmail.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token
```

### 5. Get Google OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs: `https://developers.google.com/oauthplayground`
5. Note your Client ID and Client Secret
6. Get a refresh token:
   - Go to [OAuth2 Playground](https://developers.google.com/oauthplayground/)
   - Click settings (⚙️) and check "Use your own OAuth credentials"
   - Enter your Client ID and Client Secret
   - Select Gmail API v1 → `https://mail.google.com`
   - Click "Authorize APIs" and allow access
   - Click "Exchange authorization code for tokens"
   - Copy the refresh token

### 6. Update .env file

Update your `.env` file with the credentials from step 5.

## 🚀 Running the Application

### Development Mode

You need to run both the backend and frontend servers:

**Terminal 1 - Backend Server:**

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

**Terminal 2 - Frontend Server:**

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Mode

1. Build the frontend:

```bash
cd frontend
npm run build
cd ..
```

2. Start the server:

```bash
NODE_ENV=production npm start
```

The entire application will be served from `http://localhost:5000`

## 📖 API Endpoints

### POST /api/register

Register a new user and send verification email.

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Registration successful. Please check your email for verification code.",
  "email": "john@example.com"
}
```

### POST /api/verify-email

Verify user's email with 4-digit code.

**Request Body:**

```json
{
  "code": "1234"
}
```

**Response:**

```json
{
  "message": "Email verified successfully",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "verified": true
  }
}
```

### POST /api/resend-verification

Resend verification code to user's email.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "Verification code sent successfully"
}
```

### POST /api/login

Login with verified credentials (optional feature).

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "verified": true
  }
}
```

## 🔒 Security Features

- Passwords are hashed using bcryptjs
- Verification codes expire after 15 minutes
- Email validation on both frontend and backend
- CORS protection
- Environment variables for sensitive data

## 📧 Email Features

- **Beautiful HTML Templates**: Professional-looking emails with gradientbackgrounds
- **Verification Email**: Contains 4-digit code with 15-minute expiration notice
- **Welcome Email**: Sent after successful verification
- **Responsive Design**: Emails look great on all devices

## 🎨 Frontend Features

- **Modern UI**: Clean, gradient-based design
- **Responsive**: Works on all screen sizes
- **Auto-focus**: Automatic focus on next input field
- **Paste Support**: Paste 4-digit codes directly
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Clear error messages

## 🔧 Development

### Backend Development

The backend uses an in-memory Map for storing users and verification codes. For production, replace this with a proper database (MongoDB, PostgreSQL, etc.).

### Frontend Development

The frontend uses Vite for fast development and hot module replacement.

## 📝 Notes

- This project uses in-memory storage for demonstration. In production, use a proper database.
- The verification code expires after 15 minutes.
- Make sure to keep your `.env` file secure and never commit it to version control.
- For production, consider using a dedicated email service like SendGrid, AWS SES, or Mailgun.

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 📄 License

ISC

## 👤 Author

PayFlow Analytics Team

---

Made with ❤️ by the PayFlow Analytics Team
