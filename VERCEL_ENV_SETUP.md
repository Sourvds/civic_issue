# Vercel Environment Setup Guide

## Prerequisites
- GitHub account with access to: https://github.com/Sourvds/civic_issue
- Vercel account: https://vercel.com
- MongoDB Atlas account (optional, for database): https://www.mongodb.com/cloud/atlas

---

## Frontend Deployment (React)

### Step 1: Create Frontend Project on Vercel
1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Select **Connect Git Repository**
4. Choose **civic_issue** repository
5. For **Root Directory**, select: `frontend`
6. Click **Deploy**

### Step 2: Frontend Environment Variables
**Note: Frontend doesn't need secrets in Vercel - uses public env vars**

After deployment:
1. Go to project settings → **Environment Variables**
2. No variables required (frontend works with defaults)
3. The API will default to backend Vercel URL once deployed

---

## Backend Deployment (Node.js API)

### Step 1: Create Backend Project on Vercel
1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Select **Connect Git Repository**
4. Choose **civic_issue** repository (same repo, different project)
5. For **Root Directory**, select: `backend`
6. **Before clicking Deploy**, add environment variables (see Step 2)

### Step 2: Backend Environment Variables
Click **"Environment Variables"** section and add these:

#### Option A: Quick Start (Development Mode)
```
PORT = 3001
NODE_ENV = production
MONGODB_URI = mongodb://localhost:27017/localpulse
JWT_SECRET = your-super-secret-jwt-key-change-this
AI_ENGINE_URL = http://localhost:5000/analyze
```

#### Option B: Production Setup (Recommended)
Use MongoDB Atlas for persistent database:

1. **Set up MongoDB Atlas** (if not already done):
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create new cluster (M0 free tier)
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/localpulse`

2. **Add to Vercel Environment Variables**:
   ```
   PORT = 3001
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/localpulse
   JWT_SECRET = generate-random-string-here
   AI_ENGINE_URL = https://your-ai-engine-url.vercel.app/analyze
   ```

### Step 3: Deploy Backend
After adding environment variables → Click **Deploy**

### Step 4: Get Backend URL
Once deployed:
1. Copy your Backend URL (e.g., `https://civic-backend.vercel.app`)
2. Note the API base: `https://civic-backend.vercel.app/api`

---

## Frontend Update with Backend URL

### Step 1: Update Frontend API URL
1. Go to your **Frontend Vercel Project** → Settings → **Environment Variables**
2. Add new variable:
   ```
   VITE_API_URL = https://your-backend-vercel-url (e.g., https://civic-backend.vercel.app)
   ```
3. Go back to **Deployments** → Click latest deployment → **Redeploy** or click menu → **Redeploy**

---

## Testing Your Deployment

### Frontend Tests
- [ ] Visit frontend URL in browser
- [ ] Register a new account
- [ ] Try creating a complaint
- [ ] Check if data persists after refresh

### Backend Tests
- [ ] Visit `https://your-backend-url/health`
- [ ] Should return: `{"status":"OK","message":"Server is running"}`
- [ ] Test API: `GET https://your-backend-url/api/complaints`

### Full Integration Test
1. Create a complaint through frontend
2. Verify it appears in MongoDB (or database list)
3. Check if AI analysis was applied (category, severity predicted)

---

## Common Issues & Fixes

### Issue: "MONGODB_URI is undefined"
**Solution**: Add `MONGODB_URI` to Vercel environment variables (see Step 2 above)

### Issue: Frontend can't reach backend
**Solution**: 
1. Update `VITE_API_URL` in frontend env vars
2. Redeploy frontend after changing env var
3. Check CORS is enabled in backend (it is by default)

### Issue: Build fails - "Cannot find module"
**Solution**: 
1. Check `package.json` has all dependencies
2. Run locally: `npm install` to verify
3. Push changes to GitHub
4. Redeploy from Vercel

### Issue: MongoDB connection timeout
**Solution**:
1. If using MongoDB Atlas, add Vercel IP to IP whitelist:
   - Go to MongoDB Atlas → Security → Network Access
   - Add IP: `0.0.0.0/0` (allows all IPs - for demo only)
   - For production: Add specific Vercel region IPs

---

## Deployment Status Checklist

- [ ] Frontend deployed at: _____________________
- [ ] Backend deployed at: _____________________
- [ ] MongoDB URI configured: Yes / No
- [ ] JWT Secret set: Yes / No
- [ ] Frontend-Backend communication: Working / Testing
- [ ] Data persistence verified: Yes / No

---

## Next Steps

1. **Monitor Logs**: In Vercel dashboard → project → Function Logs
2. **Domain Setup**: Add custom domain in Vercel settings
3. **CI/CD**: Auto-deploys on GitHub push (already enabled)
4. **AI Engine**: Deploy to Railway.app or Render.com (separate guides available)

---

## Quick Reference

| Component | Type | Status |
|-----------|------|--------|
| Frontend | React + Vite | Deploy as separate project |
| Backend | Node.js + Express | Deploy as separate project |
| Database | MongoDB Atlas | Create free account |
| Secrets | JWT, API Keys | Store in Vercel env vars |

**Need Help?** Check logs in Vercel dashboard → project → Logs tab
