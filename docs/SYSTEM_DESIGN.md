# LocalPulse - Complete System-Level Blueprint

## System Overview

LocalPulse is an **AI-Powered Civic Issue Tracker** designed for smart cities. It uses machine learning to analyze citizen complaints and automatically categorize, prioritize, and route them to appropriate departments.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Citizen Portal | Admin Dashboard | Public Map        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────▼────────────────────────────────┐
│              BACKEND API (Node.js + Express)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Auth | Complaints | Departments | Users             │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────┬──────────────────────────────────────┬────────────┘
           │ HTTP                                  │ REST
         ┌─┴──────────┐                    ┌──────▼──┐
    ┌────▼─────┐      │                    │         │
    │AI ENGINE  │◄─────┘                    │MongoDB   │
    │(Python)   │                          │(Database)│
    └──────────┘                           └─────────┘
```

---

## Layer-by-Layer Breakdown

### 1. FRONTEND (React.js)
**Purpose**: User interface for citizens and admins

**Pages**:
- Login/Register
- Dashboard (stats, complaint list)
- Report Issue (form + map)
- Complaint Details (timeline, status)
- Public Map (view all complaints)
- Admin Dashboard (filters, analytics)

**Tech**: React 18, TypeScript, Tailwind CSS, Leaflet Maps

---

### 2. BACKEND (Node.js + Express)
**Purpose**: API logic, authentication, database management

**Responsibilities**:
1. Accept complaints from frontend
2. Call AI engine for analysis
3. Save results to MongoDB
4. Provide REST API for CRUD operations
5. JWT authentication

**Key Endpoints**:
```
POST /api/complaints       → Create complaint
GET /api/complaints        → List complaints (with filters)
PATCH /api/complaints/:id/status → Update status
POST /api/auth/register    → Register user
POST /api/auth/login       → Login
```

---

### 3. AI ENGINE (Python + FastAPI)
**Purpose**: NLP + ML analysis

**5-Step Pipeline**:
1. **Text Preprocessing** → Lowercase, tokenize, lemmatize
2. **Category Classification** → TF-IDF + Logistic Regression
3. **Severity Prediction** → Random Forest
4. **Department Mapping** → Rule-based
5. **Resolution Time Prediction** → Regression model

**Example**:
```
Input: "Pothole on Main Street"
        ↓
Output: {
  category: "Road",
  severity: "High",
  department: "Road & Infrastructure",
  resolution_days: 7
}
```

---

### 4. DATABASE (MongoDB)
**Collections**:

#### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: "citizen" | "admin" | "department",
  phone: String,
  address: String,
  createdAt: Date
}
```

#### Complaints
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String, // Road, Water, Electricity, Sanitation
  severity: String, // Low, Medium, High, Critical
  status: String,   // submitted, assigned, in-progress, resolved
  location: { latitude, longitude, address },
  image: String,
  citizenId: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User),
  aiAnalysis: { confidence, keywords, timestamp },
  predictedResolutionDays: Number,
  timeline: [ { status, timestamp, comment } ],
  createdAt: Date,
  updatedAt: Date
}
```

#### Departments
```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  categories: [String],
  email: String,
  avgResolutionDays: Number
}
```

---

## Data Flow Example

### 🔹 Step 1: User Submits Complaint
**Frontend** → Sends form data to backend
```json
{
  "title": "Pothole on Main Street",
  "description": "Large pothole near railway station, very dangerous",
  "category": "Road",
  "location": { "latitude": 28.6139, "longitude": 77.209 },
  "image": "file.jpg"
}
```

---

### 🔹 Step 2: Backend Processes
1. Validates input
2. Creates complaint document (status: 'submitted')
3. **Calls AI Engine** with description

---

### 🔹 Step 3: AI Engine Analyzes
```python
# Input
text = "Large pothole near railway station, very dangerous"

# Processing
category = "Road" (98% confidence)
severity = "High" (keywords: "large", "dangerous")
department = "Road & Infrastructure"
resolution_days = 7

# Output
{
  "category": "Road",
  "severity": "High",
  "department": "Road & Infrastructure",
  "confidence": 0.98,
  "keywords": ["pothole", "railway", "dangerous"],
  "resolution_days": 7
}
```

---

### 🔹 Step 4: Backend Saves Results
Updates complaint document:
```javascript
{
  category: "Road",
  severity: "High",
  department: "Road & Infrastructure",
  predictedResolutionDays: 7,
  aiAnalysis: {
    confidence: 0.98,
    keywords: ["pothole", "railway", "dangerous"],
    timestamp: ISODate()
  },
  timeline: [
    { status: "submitted", timestamp: ISODate(), comment: "Complaint submitted" }
  ]
}
```

---

### 🔹 Step 5: Frontend Updates
Shows complaint with:
- ✅ Category assigned
- ✅ Severity badge (red = High)
- ✅ AI confidence score
- ✅ Estimated resolution: 7 days

---

## Why This Architecture? (Viva Answer)

### ✅ Microservice Design
- **Separates concerns**: Frontend, Backend, AI independent
- **Scalability**: Each service can scale independently
- **Maintainability**: Easy to update/replace services
- **Technology diversity**: Use best language for each task

### ✅ ML Microservice
- **Independent training**: AI models don't block API
- **Real-time inference**: Fast API response
- **Easy updates**: Retrain models without backend downtime
- **Isolation**: Failures in AI don't crash backend

### ✅ Production-Ready
- Middleware validation
- Error handling
- JWT authentication
- Database indexing
- CORS enabled
- Environment variables

---

## Key Innovations (For Examiners)

| Feature | Why It Matters |
|---------|----------------|
| **AI Triage System** | Automatic categorization saves admin time |
| **Multi-model ML** | Combines classifier + predictor for better accuracy |
| **Real-time Dashboard** | Live complaint statistics |
| **Microservice Architecture** | Enterprise-grade scalability |
| **Geographic Mapping** | Spatial visualization of issues |
| **Severity Prediction** | Prioritize urgent complaints |

---

## Deployment (Docker)

```bash
docker-compose up --build
```

This starts:
- Frontend (port 5173)
- Backend (port 3000)
- AI Engine (port 5000)
- MongoDB (port 27017)

---

## Performance Metrics

- **Complaint Processing**: < 500ms
- **AI Analysis**: < 200ms
- **Database Query**: < 100ms
- **Frontend Load**: < 2s

---

## Security

✅ JWT authentication
✅ Password hashing (bcrypt)
✅ Input validation
✅ CORS protection
✅ Environment variables for secrets

---

This blueprint is **production-ready** and follows **industry best practices**!

🚀 Perfect for Seminar/Viva presentations!
