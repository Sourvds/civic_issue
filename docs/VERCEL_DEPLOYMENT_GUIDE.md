# Vercel Deployment Configuration

## Root-Level vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/package.json",
      "use": "@vercel/node",
      "config": { "zeroConfig": true }
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "ai-engine/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/$1"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Connect to Vercel
- Go to https://vercel.com
- Sign in with GitHub
- Click "New Project"
- Import the civic_issue repository
- Choose framework: "Other"

### 3. Configure Environment Variables

For **Backend**:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `AI_ENGINE_URL`: URL to AI engine service
- `NODE_ENV`: production

For **Frontend**:
- `VITE_API_URL`: Backend API URL (e.g., https://civic-issue-backend.vercel.app/api)

For **AI Engine**:
- `PORT`: 5000

### 4. Deploy
- Click "Deploy"
- Vercel will build and deploy all services

### 5. Update Frontend API URL
After deployment, update frontend to point to your backend Vercel URL.

## Important Notes

- Each service (frontend, backend, AI) can be deployed separately
- Frontend can be deployed with Vercel's static hosting
- Backend needs Node.js runtime
- AI engine needs Python runtime
- MongoDB should be MongoDB Atlas (cloud version)
- For best results, deploy each service individually
