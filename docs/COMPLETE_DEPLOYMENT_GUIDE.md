# DEPLOYMENT GUIDE - Complete Instructions

## 🎯 Your Project Status

✅ **Code Ready**: All 59 files created and committed locally  
⏳ **GitHub**: Ready to push (need authentication)  
⏳ **Vercel**: Ready to deploy (configuration files added)  
⏳ **Database**: Need to set up MongoDB

---

## 📋 Deployment Checklist

### Phase 1: GitHub Push (5 minutes)
- [ ] Create GitHub Personal Access Token
- [ ] Push code to GitHub
- [ ] Verify all files in GitHub

### Phase 2: Database Setup (10 minutes)
- [ ] Create MongoDB Atlas account
- [ ] Create database cluster
- [ ] Get connection string
- [ ] Save in `.env` file

### Phase 3: Vercel Frontend Deploy (10 minutes)
- [ ] Create Vercel account
- [ ] Import frontend project
- [ ] Add environment variables
- [ ] Deploy

### Phase 4: Vercel Backend Deploy (10 minutes)
- [ ] Create backend project in Vercel
- [ ] Add environment variables
- [ ] Deploy
- [ ] Test API

### Phase 5: Final Testing (5 minutes)
- [ ] Test frontend
- [ ] Test API endpoints
- [ ] Test authentication
- [ ] Test complaint submission

---

## 🚀 Step-by-Step Deployment

### STEP 1: Push to GitHub

**Goal**: Upload code to GitHub  
**Time**: 5 minutes

```powershell
# 1. Go to GitHub Personal Access Tokens
# https://github.com/settings/tokens
# Create token with 'repo' scope
# Copy the token

# 2. Update git remote (replace TOKEN with actual token)
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"
git remote set-url origin https://TOKEN@github.com/iamsoura005/Civic-issue.git

# 3. Push to GitHub
git push -u origin main

# 4. Verify in browser
# Go to https://github.com/iamsoura005/Civic-issue
# Should see all files uploaded ✅
```

**Troubleshooting**: See [GITHUB_SETUP.md](GITHUB_SETUP.md)

---

### STEP 2: Setup MongoDB Atlas

**Goal**: Create cloud database  
**Time**: 10 minutes

#### 2.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or email
3. Create organization
4. Create project (name: "LocalPulse")

#### 2.2 Create Cluster
1. Click "Build a Cluster"
2. Choose:
   - **Provider**: AWS
   - **Region**: N. Virginia (us-east-1) - or nearest to you
   - **Plan**: M0 (Free ✅)
3. Click "Create Cluster"
4. Wait 5-10 minutes for creation

#### 2.3 Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Set:
   - **Username**: `admin`
   - **Password**: Create strong password (copy it!)
   - **Built-in Roles**: `Atlas admin`
4. Click "Add User"

#### 2.4 Add IP Whitelist
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (or specific IP)
4. Click "Confirm"

#### 2.5 Get Connection String
1. Go to "Clusters" (left sidebar)
2. Click "Connect"
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<database>` with `localpulse`

**Connection String Format**:
```
mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/localpulse?retryWrites=true&w=majority
```

Save this! You'll need it for Vercel.

---

### STEP 3: Deploy Frontend to Vercel

**Goal**: Deploy React frontend  
**Time**: 10 minutes

#### 3.1 Create Vercel Account
1. Go to https://vercel.com/new
2. Sign up with GitHub (use same GitHub account)
3. Authorize Vercel

#### 3.2 Import Project
1. Click "Import Project"
2. Connect GitHub
3. Select repo: `iamsoura005/Civic-issue`
4. Click "Import"

#### 3.3 Configure Frontend
1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`

#### 3.4 Add Environment Variables
1. Click "Environment Variables"
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.vercel.app/api`
   - (You'll update this after backend deployment)
3. Click "Deploy"

#### 3.5 Wait for Deployment
- Vercel builds and deploys automatically
- You'll see:
```
✓ Built and deployed to https://civic-issue.vercel.app
```

**Save this URL**: `https://civic-issue.vercel.app` (or your custom domain)

---

### STEP 4: Deploy Backend to Vercel

**Goal**: Deploy Node.js API  
**Time**: 10 minutes

#### 4.1 Create Backend Project
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select same repo: `iamsoura005/Civic-issue`
4. **Root Directory**: `backend`
5. Click "Continue"

#### 4.2 Configure Build & Start
In "Project Settings":
- **Framework**: Node.js
- **Build Command**: `npm install` (already has node_modules build)
- **Output Directory**: (leave empty)
- **Start Command**: `npm start`

#### 4.3 Add Environment Variables
Click "Environment Variables":
1. `MONGODB_URI` = Your MongoDB connection string
2. `JWT_SECRET` = `your-super-secret-key-12345` (strong random string)
3. `AI_ENGINE_URL` = `https://your-ai-vercel.vercel.app`
4. `NODE_ENV` = `production`

#### 4.4 Deploy
- Click "Deploy"
- Wait for build completion
- Save the URL: `https://your-backend-name.vercel.app`

**Update Frontend Environment Variable**:
1. Go to Frontend project > Settings > Environment Variables
2. Update `VITE_API_URL` = `https://your-backend-name.vercel.app/api`
3. Redeploy frontend

---

### STEP 5: Deploy AI Engine (Optional - If Using Vercel)

**Note**: Python/FastAPI on Vercel is limited. Better options:
- **Railway.app** (recommended for Python)
- **Render.com**
- **Heroku**
- **DigitalOcean App Platform**

#### Using Railway (Recommended for Python):

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Select GitHub repo
5. Select `ai-engine` folder
6. Add environment: `PORT=3000`
7. Deploy

Get your Railway URL and update Backend `AI_ENGINE_URL` env var.

---

## ✅ Testing After Deployment

### Test 1: Frontend Loading
```
Go to: https://civic-issue.vercel.app
Should see: Login page ✅
```

### Test 2: API Health Check
```
curl https://your-backend.vercel.app/health
Response: {"status": "OK", "message": "Server is running"}
```

### Test 3: Register Account
```
1. Open frontend URL
2. Click Register
3. Fill form: name, email, password
4. Submit
5. Should see login redirect ✅
```

### Test 4: Login
```
1. Use credentials from registration
2. Should see dashboard ✅
```

### Test 5: Report Issue
```
1. Click "Report Issue"
2. Fill form
3. Submit
4. Should see confirmation ✅
5. Should appear in dashboard ✅
```

---

## 🔧 Environment Variables Summary

### Frontend (.env.production)
```
VITE_API_URL=https://backend-name.vercel.app/api
```

### Backend (.env.production)
```
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster.mongodb.net/localpulse
JWT_SECRET=your-strong-secret-key-here
AI_ENGINE_URL=https://your-ai-server.railway.app
NODE_ENV=production
```

### AI Engine (.env)
```
PORT=3000
LOG_LEVEL=info
```

---

## 🐛 Troubleshooting

### "Cannot find module" Error
```
Solution: In Vercel, make sure Root Directory is set correctly:
- Frontend: frontend/
- Backend: backend/
- AI: ai-engine/
```

### "Database connection failed"
```
Solution: 
1. Check MongoDB connection string in .env
2. Verify IP whitelist (add Vercel IPs)
3. Check username/password
```

### "CORS Error"
```
Solution: Update backend CORS:
// backend/src/app.js
app.use(cors({
  origin: "https://your-frontend.vercel.app",
  credentials: true
}));
```

### "API returning 401"
```
Solution: 
1. Check JWT_SECRET in backend .env
2. Ensure token is being sent with requests
3. Check token expiration
```

---

## 📊 Final Deployment URLs

Once deployed, you'll have:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | `https://civic-issue.vercel.app` | 🟢 |
| **Backend API** | `https://backend-xxxxx.vercel.app` | 🟢 |
| **AI Engine** | `https://ai-engine.railway.app` | 🟢 |
| **Database** | MongoDB Atlas | 🟢 |

---

## 📝 Documentation Links

- [GitHub Setup](GITHUB_SETUP.md) - Push to GitHub
- [Vercel Deployment](VERCEL_DEPLOYMENT.md) - Detailed Vercel guide
- [System Design](SYSTEM_DESIGN.md) - Architecture
- [API Documentation](API_DOCUMENTATION.md) - API endpoints
- [Installation](INSTALLATION.md) - Local setup

---

## 🎉 Deployment Complete!

After all steps:

```
✅ Code on GitHub
✅ Frontend on Vercel
✅ Backend on Vercel
✅ Database on MongoDB Atlas
✅ AI Engine on Railway/Vercel
✅ Full application live!
```

**Your application is now live at**: `https://civic-issue.vercel.app` 🚀

---

## 📞 Quick Reference Commands

```bash
# Check git status
git status

# View commits
git log --oneline -5

# Check remote
git remote -v

# Test API locally before deploying
curl http://localhost:3000/health

# Check MongoDB connection
mongosh "your-connection-string"
```

---

**Ready to deploy? Start with [GITHUB_SETUP.md](GITHUB_SETUP.md)** 🚀
