# Deployment Guide

## 🚀 Deploying to Railway (Backend) + Vercel (Frontend)

### **Step 1: Deploy Backend to Railway**

1. **Create Railway Account**: https://railway.app

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Set Environment Variables** in Railway:

   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   EMAIL_FROM=PayFlow Analytics <your-email@gmail.com>
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ```

4. **Deploy**: Railway will automatically deploy

5. **Get Railway URL**: Copy your backend URL (e.g., `https://your-app.up.railway.app`)

---

### **Step 2: Deploy Frontend to Vercel**

1. **Update Frontend API URL**:
   - Go to `frontend/src` and create a config file if axios base URL needs updating
   - Or use Vercel environment variable

2. **Deploy to Vercel**:

   ```bash
   cd frontend
   npm run build
   ```

3. **Create Vercel Project**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Set Root Directory: `frontend`
   - Framework Preset: Vite

4. **Set Vercel Environment Variables**:

   ```
   VITE_API_URL=https://your-app.up.railway.app
   ```

5. **Deploy**: Vercel will build and deploy

6. **Update Railway FRONTEND_URL**:
   - Go back to Railway
   - Update `FRONTEND_URL` to your Vercel URL

---

### **Step 3: Update Frontend to Use Environment Variable**

Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-railway-backend.up.railway.app
```

Update axios calls to use:

```javascript
axios.post(`${import.meta.env.VITE_API_URL}/api/register`, ...)
```

---

## 🔒 Security Checklist Before Deploying

- [ ] `.env` file is in `.gitignore` (check: it is ✅)
- [ ] All secrets use environment variables (check: yes ✅)
- [ ] CORS is configured for production domain (check: yes ✅)
- [ ] Gmail App Password is valid
- [ ] Environment variables set in Railway
- [ ] Frontend URL updated in Railway env
- [ ] Backend URL updated in Vercel env

---

## ⚠️ Important Warnings

### **1. In-Memory Storage**

Your app currently stores users in memory (Map). This means:

- ✅ **Good for**: Testing, demos
- ❌ **Bad for**: Production (data lost on restart)
- **Solution**: Add MongoDB/PostgreSQL before production

### **2. No Rate Limiting**

Add rate limiting to prevent abuse:

```bash
npm install express-rate-limit
```

### **3. No Session Management**

Currently no JWT/sessions. Users lose auth on page refresh.

- Consider adding JWT tokens for persistent login

---

## 📧 Gmail Configuration

Your app needs a Gmail App Password:

1. Enable 2FA: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `EMAIL_PASSWORD`

---

## 🧪 Testing Before Production

1. **Test locally with production env**:

   ```bash
   NODE_ENV=production npm start
   ```

2. **Test email sending**
3. **Test all registration flows**
4. **Check CORS from production frontend URL**

---

## 🛠️ Alternative: Deploy Both on Railway

You can deploy both frontend and backend on Railway:

1. Deploy backend as above
2. Deploy frontend:
   - New Railway service
   - Build command: `cd frontend && npm install && npm run build`
   - Start command: `cd frontend && npx serve -s dist -l $PORT`
   - Set environment variables

---

## 📝 Post-Deployment

1. **Monitor logs** in Railway dashboard
2. **Test registration flow** end-to-end
3. **Check email delivery**
4. **Set up custom domain** (optional)

---

## 🆘 Common Issues

**CORS errors**: Check `FRONTEND_URL` in Railway matches Vercel URL exactly

**Email not sending**: Verify Gmail App Password is correct

**500 errors**: Check Railway logs for errors

**Frontend can't reach backend**: Verify `VITE_API_URL` is set correctly
