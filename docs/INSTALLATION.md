# LocalPulse - Installation & Setup Guide

## Prerequisites

- **Node.js** 18+ (https://nodejs.org)
- **Python** 3.11+ (https://python.org)
- **MongoDB** 6.0+ (https://mongodb.com/try/download/community)
- **Git** (https://git-scm.com)
- **Docker** & **Docker Compose** (optional, https://docker.com)

---

## Option A: Docker Setup (Recommended ⭐)

### 1. Clone Repository
```bash
git clone <repo-url> localpulse
cd localpulse
```

### 2. Start Services
```bash
docker-compose up --build
```

### 3. Wait for all services to start
```
✅ Frontend: http://localhost:5173
✅ Backend: http://localhost:3000
✅ AI Engine: http://localhost:5000
✅ MongoDB: localhost:27017
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:3000/health
- **AI Health**: http://localhost:5000/health

---

## Option B: Manual Setup

### Backend Setup

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env if needed (MongoDB URL, etc.)
nano .env

# Install dependencies
npm install

# Start server
npm run dev
# Server runs on http://localhost:3000
```

### AI Engine Setup

```bash
cd ai-engine

# Copy environment variables
cp .env.example .env

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend

# Copy environment variables
cp .env.example .env

# Edit .env if needed
nano .env

# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on http://localhost:5173
```

---

## Verify Installation

### 1. Check Backend Health
```bash
curl http://localhost:3000/health
# Expected: { "status": "OK", "message": "Server is running" }
```

### 2. Check AI Engine Health
```bash
curl http://localhost:5000/health
# Expected: { "status": "OK", "message": "AI Engine is running" }
```

### 3. Test Authentication
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Test AI Analysis
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Pothole on Main Street"}'
```

---

## MongoDB Setup

### Local MongoDB
```bash
# Start MongoDB
mongod

# In another terminal, connect
mongo localpulse

# Initialize database
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "root", db: "admin" }]
});
```

### MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account & cluster
3. Copy connection string
4. Update `.env` with connection string

---

## Configuration

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/localpulse
JWT_SECRET=your-super-secret-key-here
AI_ENGINE_URL=http://localhost:5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

### AI Engine (.env)
```
PORT=5000
LOG_LEVEL=info
```

---

## Troubleshooting

### Port Already in Use
```bash
# For Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# For Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows: Check MongoDB service in Services
# Linux/Mac: ps aux | grep mongod

# Make sure connection string is correct in .env
```

### AI Engine Won't Start
```bash
# Verify Python version
python --version  # Should be 3.11+

# Reinstall NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
```

### CORS Errors
```
Update backend CORS settings in src/app.js to allow frontend URL
```

---

## First Time Usage

### 1. Register Account
- Go to http://localhost:5173
- Click "Register"
- Fill form and submit

### 2. Login
- Click "Login"
- Enter credentials

### 3. Report Issue
- Click "Report Issue"
- Fill form with description
- Pick location on map
- Click "Submit Complaint"

### 4. View Dashboard
- See all your complaints
- Filter by status/severity
- Click complaint for details

### 5. View Public Map
- Click "Map"
- See all complaints as markers
- Click marker for details

---

## Development Scripts

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### AI Engine
```bash
python main.py   # Start server
python training/train.py # Train models
```

---

## Production Deployment

### Using Docker Compose
```bash
docker-compose -f docker-compose.yml up -d
```

### Using Kubernetes
See `docker/k8s/` for Kubernetes configs

### Environment Variables
Create `.env` files for each service with production values

---

## Maintenance

### Backup Database
```bash
mongodump --db localpulse --out ./backup
```

### Clear Logs
```bash
# Backend logs
rm -rf backend/logs/*

# AI Engine logs
rm -rf ai-engine/logs/*
```

### Update Dependencies
```bash
# Backend
npm update

# Frontend
npm update

# AI Engine
pip install --upgrade -r requirements.txt
```

---

## Support

For issues:
1. Check logs: `docker logs <container-name>`
2. Check MongoDB: `mongo localpulse`
3. Verify network: `curl http://localhost:3000/health`
4. Open GitHub issue

---

**Installation complete! Happy coding! 🚀**
