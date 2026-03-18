# LocalPulse

AI-Powered Civic Issue Tracker for Smart Cities

## 🎯 Overview

LocalPulse is a full-stack web application that enables citizens to report civic issues (potholes, water leaks, electricity outages, etc.) with AI-powered analysis.

**Key Features:**
- 🤖 AI-driven complaint classification & severity prediction
- 📍 Interactive map with complaint markers
- 👤 Citizen dashboard to track complaints
- 👨‍💼 Admin dashboard with analytics
- ⚡ Real-time notifications
- 🔐 JWT-based authentication

## 📊 System Architecture

```
Frontend (React)  →  Backend (Node.js)  →  AI Engine (Python)
                            ↓
                       MongoDB
```

### 3-Layer Architecture
1. **Frontend**: React + TypeScript + Tailwind CSS
2. **Backend**: Node.js + Express + MongoDB
3. **AI Engine**: Python + FastAPI (Microservice)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB 6.0+
- Docker & Docker Compose (optional)

### Option 1: Docker (Recommended)

```bash
cd localpulse
docker-compose up --build
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- AI Engine: http://localhost:5000

### Option 2: Manual Setup

#### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### AI Engine
```bash
cd ai-engine
pip install -r requirements.txt
python main.py
```

#### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 📁 Project Structure

```
localpulse/
├── frontend/          # React.js + TypeScript
├── backend/           # Node.js + Express
├── ai-engine/         # Python + FastAPI
├── database/          # MongoDB schemas
├── docker/            # Docker configs
└── docs/              # Documentation
```

## 🤖 AI Engine Pipeline

### Input
```json
{
  "text": "There is a large pothole on Main Street"
}
```

### Processing Steps
1. **Preprocessing**: Lowercase, tokenization, lemmatization
2. **Classification**: TF-IDF + Logistic Regression
3. **Severity Prediction**: Random Forest
4. **Department Mapping**: Rule-based
5. **Resolution Time**: Regression model

### Output
```json
{
  "category": "Road",
  "severity": "High",
  "department": "Road & Infrastructure",
  "confidence": 0.95,
  "keywords": ["pothole", "street", "main"],
  "resolution_days": 7
}
```

## 📊 Database Schema

### Users Collection
- name, email, password, role, phone, address, profileImage

### Complaints Collection
- title, description, category, severity, status
- location, image, citizenId, assignedTo
- aiAnalysis, timeline, predictedResolutionDays

### Departments Collection
- name, code, categories, email, phone, avgResolutionDays

## 🎨 UI Components

### Citizen Portal
- Dashboard with complaint stats
- Report Issue form (with map picker)
- Complaint tracking
- Public map view

### Admin Dashboard
- Table view of all complaints
- Filters: department, severity, status
- Analytics & charts
- Assignment management

## 🔐 Authentication

- JWT-based auth
- Token stored in localStorage
- Middleware verification on all protected routes

## 📈 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Complaints
- `POST /api/complaints` - Create complaint
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get complaint details
- `PATCH /api/complaints/:id/status` - Update status
- `PATCH /api/complaints/:id/assign` - Assign to user

## 🧠 ML Models

### Category Classifier
- Model: Logistic Regression
- Feature: TF-IDF
- Input: Processed text
- Output: 5 categories

### Severity Predictor
- Model: Random Forest
- Features: Text length, keyword intensity
- Output: 4 severity levels

### Resolution Time Predictor
- Model: Regression
- Features: Category × Severity
- Output: Days (1-30)

## 📚 Documentation

See [docs/](docs/) folder for:
- System Design Document
- API Documentation
- Research Paper
- Architecture Diagrams

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, React Router, Leaflet Maps |
| **Backend** | Node.js, Express, MongoDB, Mongoose, JWT |
| **AI** | Python, FastAPI, scikit-learn, NLTK, spaCy |
| **DevOps** | Docker, Docker Compose |

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/localpulse
JWT_SECRET=your-secret-key
AI_ENGINE_URL=http://localhost:5000
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

### AI Engine (.env)
```
PORT=5000
```

## 🎓 Key Features for Evaluation

✅ **Microservice Architecture**: Separate frontend, backend, and AI services  
✅ **NLP + ML Pipeline**: Text preprocessing, classification, prediction  
✅ **Real-time Dashboard**: Complaint statistics and filtering  
✅ **JWT Authentication**: Secure user authentication  
✅ **Scalable Design**: Independent service scaling  
✅ **Production Ready**: Error handling, validation, logging  

## 🚀 Future Enhancements

- Real-time WebSocket notifications
- SMS/Email alerts to users
- Advanced ML models (BERT, GPT)
- Complaint image analysis
- Predictive maintenance
- Community voting on complaints

## 📧 Support

For issues and questions, create an issue on the GitHub repository.

## 📄 License

MIT License - See LICENSE file

---

**Built with ❤️ for Smart Cities**
