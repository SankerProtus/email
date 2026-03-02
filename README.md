# PayFlow Analytics - Email Verification System

A production-ready email verification system with React frontend and Express backend. Users register, receive a 4-digit verification code via email, and verify their account.

��� **Live Demo:** [https://email-ltct.vercel.app](https://email-ltct.vercel.app)

## ��� Features

- ✅ User registration with email verification
- ✅ 4-digit verification codes sent via email
- ✅ Beautiful HTML email templates
- ✅ Code expiration (15 minutes)
- ✅ Professional UI with Tailwind CSS
- ✅ Deployed on Railway (backend) + Vercel (frontend)

## ���️ Tech Stack

**Frontend:** React 19.2 • React Router 7 • Tailwind CSS 4 • Vite 7 • Axios  
**Backend:** Node.js • Express 4 • Resend (email) • bcryptjs  
**Deployment:** Vercel (frontend) • Railway (backend)

## ��� Project Structure

\`\`\`
Email/
├── frontend/           # React frontend (Vercel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── verifyAccount.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── api.js      # Axios instance
│   │   └── App.jsx
│   └── package.json
├── mail/               # Email service
│   ├── resend-email.service.js
│   └── email.templates.js
├── server.js           # Express backend (Railway)
└── package.json
\`\`\`

## ��� Local Development

### Prerequisites
- Node.js 16+
- Resend account ([resend.com](https://resend.com)) - Free tier available

### Setup

1. **Clone and install dependencies:**
\`\`\`bash
git clone <your-repo-url>
cd Email
npm install
cd frontend && npm install && cd ..
\`\`\`

2. **Configure environment variables:**

Create \`.env\` in root:
\`\`\`env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
\`\`\`

Get your Resend API key from [resend.com/api-keys](https://resend.com/api-keys)

3. **Run development servers:**

Terminal 1 (Backend):
\`\`\`bash
npm run dev
\`\`\`

Terminal 2 (Frontend):
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Frontend: \`http://localhost:5173\`  
Backend: \`http://localhost:5000\`

## ��� API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | \`/api/register\` | Register user & send verification email |
| POST | \`/api/verify-email\` | Verify email with 4-digit code |
| POST | \`/api/resend-verification\` | Resend verification code |
| POST | \`/api/login\` | Login with verified account |

## ��� Environment Variables

### Backend (Railway)
\`\`\`env
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
\`\`\`

### Frontend (Vercel)
\`\`\`env
VITE_API_URL=https://your-backend.up.railway.app
\`\`\`

## ��� Email Service

Uses [Resend](https://resend.com) for reliable email delivery:
- ✅ Works with Railway (HTTP API, not SMTP)
- ✅ Free tier: 3,000 emails/month
- ✅ Professional templates with gradients
- ✅ High deliverability

## ⚠️ Production Note

Currently uses **in-memory storage** (Map). Data resets on server restart.  
For production, integrate MongoDB or PostgreSQL.

## ��� License

ISC

---

**Live App:** [https://email-ltct.vercel.app](https://email-ltct.vercel.app)
