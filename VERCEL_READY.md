# LocalPulse - Vercel Deployment Ready

This project is now configured for deployment on Vercel. Here's how to proceed:

## 📋 Prerequisites

1. **GitHub Account** - With access to https://github.com/Sourvds/civic_issue
2. **Vercel Account** - https://vercel.com (free tier available)
3. **MongoDB Atlas** - Cloud database at https://www.mongodb.com/cloud/atlas
4. **Git Credentials** - Configure GitHub authentication

---

## 🚀 Step 1: Push to GitHub

First, authenticate with GitHub and push the code:

### Option A: Use GitHub Desktop
1. Open GitHub Desktop
2. Add existing repository: `c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse`
3. Publish repository to GitHub
4. Select account: **Sourvds**
5. Repository name: **civic_issue**
6. Click "Publish Repository"

### Option B: Use Git Command Line

```bash
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"

# Configure credentials (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@github.com"

# If you have SSH key set up
git remote set-url origin git@github.com:Sourvds/civic_issue.git

# Otherwise use personal access token
# 1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
# 2. Create token with 'repo' scope
# 3. Use token as password when prompted

git push -u origin main
```

---

## 🌐 Step 2: Set Up Vercel

### For Frontend (Recommended - Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub account
3. **Click "New Project"**
4. **Import repository**: Select `civic_issue`
5. **Framework**: Select "React"
6. **Root directory**: `frontend`
7. **Build Command**: `npm run build`
8. **Output Directory**: `dist`
9. **Environment Variables**: (Leave empty for now)
10. **Click "Deploy"**

✅ **Result**: Frontend deployed at `https://civic-issue.vercel.app`

### For Backend (API)

1. **Create New Project** on Vercel
2. **Import repository**: `civic_issue`
3. **Framework**: Select "Node.js"
4. **Root directory**: `backend`
5. **Build Command**: `npm install`
6. **Output Directory**: (leave empty)
7. **Add Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Random secret key (e.g., `your-super-secret-key-123`)
   - `AI_ENGINE_URL`: AI service URL (we'll update this later)
   - `NODE_ENV`: `production`
8. **Click "Deploy"**

✅ **Result**: Backend deployed at `https://civic-issue-backend.vercel.app`

### For AI Engine (Python - Optional)

Vercel has limited Python support. Consider alternatives:
- **Railway.app** (Python friendly)
- **Render.com**
- **AWS Lambda**
- Run locally for now

---

## 🗄️ Step 3: Set Up MongoDB Atlas

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Sign up** (free tier available)
3. **Create cluster**
4. **Get connection string**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
5. **Update Vercel Backend** environment variable:
   - `MONGODB_URI`: Paste connection string

---

## 🔗 Step 4: Update Frontend API URL

After deploying backend, update frontend:

1. **Frontend Environment Variables** in Vercel:
   - `VITE_API_URL`: `https://civic-issue-backend.vercel.app/api`

2. **Or manually update** [frontend/.env](frontend/.env):
   ```
   VITE_API_URL=https://civic-issue-backend.vercel.app/api
   ```

3. **Redeploy frontend** on Vercel

---

## 📊 Final Architecture

```
User Browser
    ↓
https://civic-issue.vercel.app (Frontend - React)
    ↓
https://civic-issue-backend.vercel.app/api (Backend - Node.js)
    ↓
MongoDB Atlas (Database - Cloud)

AI Engine: (Deploy separately to Railway/Render)
https://civic-issue-ai.railway.app
```

---

## ✅ Verification

After deployment, test:

**Frontend**: https://your-frontend-url.vercel.app
- Should load login page
- Register and login
- Create complaint (should call backend)

**Backend**: https://your-backend-url.vercel.app/health
- Should return: `{"status": "OK", "message": "Server is running"}`

**API**: https://your-backend-url.vercel.app/api/auth/login
- Should return error (post request expected) but proves API works

---

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to secure random value
- [ ] Use MongoDB Atlas IP whitelist
- [ ] Enable CORS on backend for your frontend domain
- [ ] Don't commit `.env` files to GitHub
- [ ] Use Vercel environment variables for secrets
- [ ] Enable HTTPS (automatic with Vercel)

---

## 🐛 Troubleshooting

### **Frontend won't build**
- Check Node version compatibility
- Verify package.json scripts
- Check browser console for errors

### **API calls failing**
- Check `VITE_API_URL` in frontend env
- Verify backend is running
- Check CORS settings in backend
- Verify MongoDB connection

### **MongoDB connection error**
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Test connection locally first

### **Build times out**
- Might need to optimize dependencies
- Consider moving AI engine to separate service

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **React Deploy**: https://vitejs.dev/guide/static-deploy.html#vercel
- **Node Deploy**: https://vercel.com/docs/concepts/frameworks/express
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

---

## 🎉 Deployment Complete!

Your app is now:
- ✅ On GitHub (version control)
- ✅ On Vercel (live frontend)
- ✅ With secure backend API
- ✅ Production-ready deployment

**Share the frontend URL with the world!** 🚀

---

*For manual git push if needed, use:*
```bash
git push -u origin main
```

*If prompted for password, create GitHub Personal Access Token*
