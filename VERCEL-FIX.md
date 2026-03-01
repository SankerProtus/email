# Vercel Frontend Deployment Fix

## The 404 Error

You're getting a 404 because Vercel doesn't know how to handle React Router's client-side routing.

## ✅ Fix Applied

I've created `frontend/vercel.json` that tells Vercel to serve `index.html` for all routes.

## 🚀 Steps to Fix Your Deployment:

### 1. Commit and Push the New File

```bash
git add frontend/vercel.json
git commit -m "Add Vercel SPA routing config"
git push
```

### 2. Redeploy on Vercel

Vercel will automatically redeploy when you push. Or manually:

- Go to your Vercel dashboard
- Click "Redeploy" on your project

### 3. Verify the Fix

Once redeployed, visit your Vercel URL:

- `/` - Should show your app
- `/login` - Should work
- `/register` - Should work
- `/verify-account` - Should work

## ⚙️ Important: Set Environment Variable on Vercel

Your frontend needs to know where your backend API is:

1. **If you deployed backend to Railway:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-railway-app.up.railway.app`
   - Redeploy

2. **Update frontend/.env.production**
   - Replace `https://your-railway-backend.up.railway.app` with your actual Railway URL
   - Commit and push

## 🔍 How to Get Your Railway Backend URL

1. Go to Railway dashboard
2. Click on your backend service
3. Go to "Settings" tab
4. Look for "Domains" section
5. Copy the generated domain (e.g., `https://email-production-xxxx.up.railway.app`)

## 🧪 Testing After Fix

1. Visit your Vercel URL
2. Try to register a new account
3. Check that it connects to your Railway backend
4. Verify email verification works

## 🆘 Still Getting Errors?

**404 on routes**: Make sure vercel.json is in the `frontend` folder and redeployed

**API errors**:

- Check VITE_API_URL is set correctly in Vercel
- Make sure Railway backend is running
- Check CORS settings in Railway (FRONTEND_URL should match your Vercel URL)

**CORS errors**:

- Go to Railway → Environment Variables
- Update `FRONTEND_URL` to your exact Vercel URL (e.g., `https://your-app.vercel.app`)
- Redeploy Railway service
