# PayFlow Analytics - Email Verification System

A full-stack email verification system built with React, Express, and Resend. Features user registration with email verification using 4-digit codes.

## 🚀 Features

- User registration with email/password
- Email verification with 4-digit codes
- Beautiful HTML email templates
- Code resend functionality
- Code expiration (15 minutes)
- Modern responsive UI with Tailwind CSS
- Secure authentication with bcrypt

## 🛠️ Tech Stack

**Frontend:** React 19, React Router, Vite, Tailwind CSS, Axios  
**Backend:** Node.js, Express, Resend (email), bcryptjs  
**Deployment:** Vercel (frontend) + Railway (backend)

## 📁 Project Structure

```
Email/
├── frontend/           # React app
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── api.js      # API configuration
│   │   └── App.jsx     # Main app with routing
│   └── package.json
├── mail/               # Email service
│   ├── resend-email.service.js  # Resend integration
│   └── email.templates.js       # Email templates
├── server.js           # Express backend
└── package.json
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

2. **Set up environment variables:**
   
   Create `.env` in root:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   EMAIL_FALLBACK_MODE=true
   ```

3. **Run the app:**
   ```bash
   # Terminal 1 - Backend
   npm start

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

4. **Open:** http://localhost:5173

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for deploying to Railway + Vercel.

See [RESEND-SETUP.md](RESEND-SETUP.md) for complete email configuration.

## 📧 Email Setup

This project uses **Resend** for email delivery (works perfectly with Railway):

1. Create free account at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Add to environment variables

**Free tier:** 100 emails/day, 3,000/month - perfect for testing!

## ⚠️ Important Notes

- **In-memory storage:** User data resets on server restart. Add MongoDB/PostgreSQL for production.
- **Environment variables:** Never commit `.env` file (already in `.gitignore`)
- **CORS:** Configure `FRONTEND_URL` to match your domain in production

## 📝 API Endpoints

- `POST /api/register` - Register new user
- `POST /api/verify-account` - Verify email with code
- `POST /api/resend-code` - Request new verification code
- `POST /api/login` - User login

## 🔒 Security Features

- Passwords hashed with bcrypt
- CORS configured for specific origins
- Security headers (XSS, MIME, frame protection)
- Environment variable protection
- Code expiration (15 minutes)

## 📄 License

ISC

---

**Live Demo:** [https://email-ltct.vercel.app](https://email-ltct.vercel.app)  
**Documentation:** See [RESEND-SETUP.md](RESEND-SETUP.md) and [DEPLOYMENT.md](DEPLOYMENT.md)
