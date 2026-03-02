# Resend Email Setup Guide

Your email service has been updated to use **Resend** instead of Gmail SMTP. Resend works perfectly with Railway and has a generous free tier.

## Why Resend?

- ✅ **Works with Railway** - Uses HTTP API instead of SMTP
- ✅ **Free tier** - 100 emails/day, 3,000 emails/month
- ✅ **No credit card required** for testing
- ✅ **Simple setup** - Just one API key needed
- ✅ **Better deliverability** - Professional email infrastructure

---

## Setup Instructions

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click **Sign Up** (free, no credit card required)
3. Verify your email address

### Step 2: Get Your API Key

1. After logging in, go to [API Keys](https://resend.com/api-keys)
2. Click **Create API Key**
3. Name it: `Email Verification System`
4. Set permission: **Sending access**
5. Click **Add**
6. **Copy the API key** (starts with `re_`) - you can only see it once!

### Step 3: Configure Your Domain (Optional but Recommended)

**For testing**, you can skip this and use `onboarding@resend.dev`

**For production:**

1. Go to [Domains](https://resend.com/domains)
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow the DNS setup instructions
5. Once verified, you can send from `noreply@yourdomain.com`

### Step 4: Update Environment Variables

#### Local Development (.env)

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:** Use `onboarding@resend.dev` for testing, or `noreply@yourdomain.com` if you added a domain.

#### Railway Production

1. Go to your Railway project
2. Click on your service
3. Go to **Variables** tab
4. Click **New Variable** and add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_api_key`
5. Add another variable:
   - **Name:** `RESEND_FROM_EMAIL`
   - **Value:** `onboarding@resend.dev` (or your verified domain email)
6. The service will automatically redeploy

#### Vercel Frontend (No changes needed)

Your frontend already uses `VITE_API_URL` - no additional variables needed.

---

## Testing

### Local Testing

1. Update your `.env` file with Resend credentials
2. Restart your server:
   ```bash
   npm start
   ```
3. Register a new user
4. Check your email inbox for the verification code

### Production Testing

After Railway redeploys:

1. Check the logs: `Railway → Your Service → Logs`
2. Look for: `✅ Resend API key configured`
3. Register a test user on your live site
4. Verification email should arrive within seconds

---

## Troubleshooting

### "RESEND_API_KEY is not set"

- Make sure you added the API key to Railway variables
- Check the variable name is exactly `RESEND_API_KEY`
- Railway should auto-redeploy after adding variables

### "Invalid RESEND_API_KEY format"

- API key must start with `re_`
- Make sure you copied the full key with no extra spaces
- Generate a new API key if needed

### Emails not arriving

1. Check spam/junk folder
2. If using custom domain, verify DNS records are set up correctly
3. Check Railway logs for any error messages
4. Try using `onboarding@resend.dev` first for testing

### Rate limits (Free tier)

- 100 emails per day
- 3,000 emails per month
- Upgrade to paid plan if you need more

---

## What Changed in Your Code

1. **New file:** `mail/resend-email.service.js` - Uses Resend API
2. **Updated:** `server.js` - Imports from new email service
3. **Updated:** `.env.example` - Shows Resend configuration
4. **Installed:** `resend` npm package

**Old Gmail SMTP files (can delete):**

- `mail/email.service.js` (old)
- `mail/transporter.js` (old)

---

## Resend Dashboard

Monitor your emails at: [https://resend.com/emails](https://resend.com/emails)

You can see:

- Emails sent
- Delivery status
- Open/click tracking (if enabled)
- Error logs

---

## Free Tier Limits

| Feature          | Free Tier |
| ---------------- | --------- |
| Emails per day   | 100       |
| Emails per month | 3,000     |
| Team members     | 1         |
| Domains          | Unlimited |
| API requests     | Unlimited |

**Need more?** Paid plans start at $20/month for 50,000 emails.

---

## Next Steps

1. ✅ Create Resend account
2. ✅ Get API key
3. ✅ Add `RESEND_API_KEY` to Railway
4. ✅ Add `RESEND_FROM_EMAIL` to Railway
5. ✅ Test registration on your live site
6. 🎉 You're done!

---

## Support

- **Resend Docs:** [https://resend.com/docs](https://resend.com/docs)
- **Resend Support:** support@resend.com
- **Status Page:** [https://resend.com/status](https://resend.com/status)
