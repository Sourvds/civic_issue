# Vercel Deployment Configuration

## Environment Variables Required

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-api.vercel.app/api
```

### Backend (.env.production)
```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-strong-secret-key>
AI_ENGINE_URL=https://your-ai-engine.vercel.app
NODE_ENV=production
PORT=3000
```

### Environment Variables Setup in Vercel

1. **Frontend Deployment**
   - Go to vercel.com and import the repository
   - Framework: Vite (React)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     - `VITE_API_URL` = your backend API URL

2. **Backend Deployment**
   - Create separate Vercel project
   - Runtime: Node.js 18
   - Environment Variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `AI_ENGINE_URL`
     - `NODE_ENV=production`

3. **AI Engine Deployment**
   - Create separate Vercel project (Python)
   - Environment: Python 3.11
   - Environment Variables:
     - `PORT=3000` (Vercel default)

## Deployment Steps

### Step 1: Git Authentication
```bash
# Use GitHub token for authentication
git remote set-url origin https://<YOUR_GITHUB_TOKEN>@github.com/iamsoura005/Civic-issue.git
git push -u origin main
```

Or use SSH:
```bash
git remote set-url origin git@github.com:iamsoura005/Civic-issue.git
git push -u origin main
```

### Step 2: Create Vercel Projects

**Frontend:**
1. Go to https://vercel.com
2. Click "New Project"
3. Import "Civic-issue" repo
4. Root Directory: `frontend`
5. Build: `npm run build`
6. Output: `dist`
7. Add environment variables
8. Deploy

**Backend:**
1. Create new Vercel project
2. Import same repo
3. Root Directory: `backend`
4. Build: `npm install`
5. Start: `npm start`
6. Add environment variables
7. Deploy

**AI Engine:**
1. Create new Vercel project
2. Import same repo
3. Root Directory: `ai-engine`
4. Runtime: Python 3.11
5. Build: `pip install -r requirements.txt`
6. Start: `python main.py`
7. Deploy

## Important Notes

### Database
- MongoDB: Use MongoDB Atlas (free tier available)
- Connection string format: `mongodb+srv://user:password@cluster.mongodb.net/localpulse`

### CORS Configuration
Update backend CORS in `backend/src/app.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://your-frontend.vercel.app",
  credentials: true
}));
```

### API URL Updates
Frontend needs to point to backend:
```
VITE_API_URL=https://your-backend-api.vercel.app/api
```

### Serverless Functions
Vercel supports Node.js but for Python/FastAPI, you may need:
- Railway.app (Python support)
- Render.com (Python support)
- Heroku (Python support)

## Alternative: Use Single Vercel Project

You can also deploy everything as follows:

```
api/             → Backend routes
functions/       → Vercel serverless functions
frontend/        → React app (deployed to Vercel Edge)
```

See `vercel-monorepo-example.json` for this approach.

## Monitoring

After deployment, monitor:
- Frontend: https://your-frontend.vercel.app
- Backend API: https://your-backend-api.vercel.app/health
- AI Engine: https://your-ai-engine.vercel.app/health

## Rollback

If deployment fails:
```bash
vercel rollback
```

Or through Vercel dashboard > Deployments > select previous > Promote
