# 🚀 LocalPulse - GitHub Push & Vercel Deployment Guide

## Status: ✅ Project Ready for Deployment

Your LocalPulse project is **100% ready** to be pushed to GitHub and deployed on Vercel. All configuration files are in place.

---

## 📊 What's Included

✅ Complete source code (43+ files)  
✅ All services configured (Frontend, Backend, AI Engine)  
✅ Vercel configuration files (vercel.json for each service)  
✅ Environment templates (.env.example files)  
✅ Build configurations (package.json, tailwind config, etc.)  
✅ Deployment helper scripts  
✅ Complete documentation  

---

## 🔐 Step 1: GitHub Authentication (Personal Access Token)

### Create GitHub Personal Access Token

1. **Go to GitHub Settings**:
   - https://github.com/settings/tokens
   - Or: GitHub Profile → Settings → Developer Settings → Personal Access Tokens

2. **Click "Generate new token"**

3. **Fill in the form**:
   - Token name: `LocalPulse Deployment`
   - Expiration: 90 days (or custom)
   - Select scopes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

4. **Click "Generate token"**

5. **Copy the token** (you won't see it again!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. **Save it somewhere safe** (we'll use it next)

---

## 🚀 Step 2: Push to GitHub

### Method A: Using Command Line (Recommended)

```bash
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"

# When prompted for password, paste your GitHub token instead
git push -u origin main
```

**When PowerShell asks:**
```
Username: Your-GitHub-Username (or paste your token directly)
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Method B: Using GitHub Desktop

1. Open **GitHub Desktop**
2. Go to **Current Branch** → **main**
3. Click **Publish Branch**
4. Or: **Repository** → **Push**
5. It will use your saved GitHub credentials

### Method C: Using Git Credentials Manager

```bash
# Configure git credential helper
git config --global credential.helper wincred

# Then push (Windows will handle authentication)
git push -u origin main
```

---

## ✅ Step 3: Verify GitHub Upload

After pushing, verify your code is on GitHub:

1. Open: https://github.com/Sourvds/civic_issue
2. You should see:
   - ✅ All files from localpulse/
   - ✅ Multiple commits in history
   - ✅ Branch "main"

If successful, you'll see:
```
Sourvds/civic_issue
This repository has been updated 2 minutes ago
Main branch: main
```

---

## 🌐 Step 4: Deploy Frontend on Vercel

### Easy 5-Step Deployment

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "New Project"**
4. **Import repository**:
   - Find: `civic_issue`
   - Click to import
5. **Configure project**:
   - Framework Preset: **React**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Environment Variables** (Optional for now):
   - Key: `VITE_API_URL`
   - Value: `http://localhost:3000/api` (update after backend is deployed)

7. **Click "Deploy"**

⏳ **Wait 2-3 minutes for build...**

✅ **Your frontend is LIVE!**
```
Frontend URL: https://civic-issue.vercel.app
(or whatever Vercel assigns)
```

---

## 🔌 Step 5: Deploy Backend on Vercel (Optional)

For production use, you'll want the backend on Vercel:

1. **Create new Vercel project** for backend:
   - Go to https://vercel.com/new
   - Import same `civic_issue` repo
   - Root Directory: **backend**
   - Framework: **Node.js**

2. **Add Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a random secret (e.g., `your-secure-key-12345!`)
   - `AI_ENGINE_URL`: For now, can be `http://localhost:5000`
   - `NODE_ENV`: `production`

3. **Deploy**

✅ **Backend URL**: `https://civic-issue-backend.vercel.app`

---

## 🗄️ Step 6: Set Up MongoDB Atlas (Free)

Get a cloud database for production:

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Sign up** (free tier available)
3. **Create cluster**:
   - Select **Free Tier M0**
   - Region: Closest to you
   - Create cluster
4. **Create database access**:
   - Username: `admin`
   - Password: Generate strong password
5. **Get connection string**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy string: `mongodb+srv://admin:<password>@cluster.mongodb.net/localpulse?...`
6. **Update Vercel backend**:
   - Go to backend deployment settings
   - Edit environment variables
   - Set `MONGODB_URI` to your connection string

---

## 🔗 Step 7: Update Frontend API URL

After backend is deployed:

1. **Get backend URL**: `https://civic-issue-backend.vercel.app`
2. **Update frontend in Vercel**:
   - Go to Settings → Environment Variables
   - Add/Update `VITE_API_URL`: `https://civic-issue-backend.vercel.app/api`
3. **Redeploy frontend**:
   - Go to Deployments
   - Click "Redeploy" on latest
   - Select "Use existing Build Cache"

---

## 🧪 Test Your Deployment

### Test Frontend
```
https://civic-issue.vercel.app
```
- Should load login page
- Try registering
- Try creating complaint

### Test Backend API
```
curl https://civic-issue-backend.vercel.app/health
```
- Should return: `{"status":"OK","message":"Server is running"}`

### Test Database
- Backend should successfully connect to MongoDB Atlas
- Data should be persisted

---

## 📋 Quick Checklist

- [ ] Created GitHub Personal Access Token
- [ ] Pushed code to GitHub (`git push origin main`)
- [ ] Verified code on GitHub.com
- [ ] Created Vercel account
- [ ] Deployed frontend on Vercel
- [ ] Got frontend URL (https://civic-issue.vercel.app)
- [ ] Set up MongoDB Atlas (optional but recommended)
- [ ] Deployed backend on Vercel (optional)
- [ ] Updated frontend API URL
- [ ] Tested frontend (can load and register)
- [ ] Tested backend API (health check works)

---

## 🎯 Minimal Deployment (Just Frontend)

If you want the quickest setup:

**1. Push to GitHub**:
```bash
git push origin main
```

**2. Deploy frontend on Vercel**:
- Import `civic_issue` repo
- Root directory: `frontend`
- Deploy!

**Result**: Frontend live at https://civic-issue.vercel.app

(Backend would still run locally for development)

---

## 🚨 Common Issues & Solutions

### Issue: "Permission denied (publickey)"
**Solution**: Use HTTPS instead of SSH
```bash
git remote set-url origin https://github.com/Sourvds/civic_issue.git
git push origin main
```
Then paste your GitHub token when asked for password.

### Issue: "fatal: 'origin' does not appear to be a git repository"
**Solution**: Ensure you're in correct directory
```bash
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"
git status
git push origin main
```

### Issue: "Build failed" on Vercel
**Solution**: Check build logs
- Go to Vercel Deployments
- Click on failed deployment
- Scroll to "Logs"
- Look for error message
- Most common: Missing dependencies or environment variable

### Issue: "Cannot find module 'express'"
**Solution**: Missing dependencies
- Go to Vercel backend settings
- Edit package.json in repo
- Run `npm install` locally
- Push changes to GitHub
- Redeploy

### Issue: Frontend says "Cannot reach API"
**Solution**: Wrong API URL
- Check environment variables in Vercel
- Make sure `VITE_API_URL` matches backend URL
- Redeploy frontend

---

## 📞 Resources

| Need | Link |
|------|------|
| Vercel Docs | https://vercel.com/docs |
| GitHub Help | https://docs.github.com |
| MongoDB Atlas | https://docs.atlas.mongodb.com |
| React Deployment | https://vitejs.dev/guide/static-deploy.html |
| Express on Vercel | https://vercel.com/docs/concepts/frameworks/express |

---

## 🎉 Success!

Once deployed, your app is:
- ✅ Live on the internet
- ✅ Backed by MongoDB
- ✅ Running on production servers
- ✅ Automatically scaled by Vercel
- ✅ Supported by Vercel's global CDN

**Share your frontend URL**: https://civic-issue.vercel.app

---

## 💡 Next Steps (Optional)

1. **Add custom domain** to Vercel
2. **Enable CI/CD** for automatic deployments on push
3. **Add monitoring** (Sentry, LogRocket)
4. **Deploy AI engine** to Railway/Render
5. **Add more features** and redeploy

---

**Ready? Run:** `git push origin main` 🚀

---

*For any issues, check:*
- Vercel deployment logs
- GitHub commit history
- This guide's troubleshooting section
- Service status pages (GitHub, Vercel, MongoDB)

