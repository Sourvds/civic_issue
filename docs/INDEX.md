# LocalPulse - Documentation Index

## 📚 Quick Navigation

### 🚀 Getting Started
1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ← **START HERE**
   - What was built
   - Quick start guide
   - Project structure

2. **[README.md](README.md)**
   - Project overview
   - Features
   - Tech stack

3. **[docs/INSTALLATION.md](docs/INSTALLATION.md)**
   - Step-by-step setup
   - Docker instruction
   - Manual setup
   - Troubleshooting

---

### 🏗️ Understanding the System

4. **[docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md)**
   - Architecture diagram
   - Layer-by-layer breakdown
   - Why this architecture?
   - Data flow example
   - **Perfect for viva!**

5. **[database/schemas/DATABASE_SCHEMA.md](database/schemas/DATABASE_SCHEMA.md)**
   - MongoDB collections
   - Schema details
   - Sample data
   - Query examples

6. **[docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)**
   - All REST endpoints
   - Request/response examples
   - Error codes
   - Status codes

---

### 🎓 For Viva Preparation

7. **[docs/VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md)** ← **MUST READ**
   - 10-point viva guide
   - Common questions & answers
   - Demo script
   - Do's & Don'ts
   - Preparation timeline

---

### 💻 Source Code Structure

```
Frontend (React)
├─ src/components/       → UI components
├─ src/pages/           → Page components
├─ src/services/        → API integration
├─ src/context/         → Auth management
└─ src/App.tsx          → Main entry point

Backend (Node.js)
├─ src/models/          → MongoDB schemas
├─ src/controllers/     → Business logic
├─ src/routes/          → API endpoints
├─ src/middleware/      → JWT auth
├─ src/services/        → AI integration
└─ src/app.js           → Express app

AI Engine (Python)
├─ inference/           → ML models
├─ api/                 → FastAPI server
├─ data/                → Training data
└─ training/            → Training scripts
```

---

## 📖 Documentation Files

| File | Purpose | Read When |
|------|---------|-----------|
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Overview | First thing |
| [README.md](README.md) | Project intro | Getting started |
| [INSTALLATION.md](docs/INSTALLATION.md) | Setup guide | Setting up project |
| [SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) | Architecture | Understanding design |
| [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) | API reference | Using backend API |
| [DATABASE_SCHEMA.md](database/schemas/DATABASE_SCHEMA.md) | Database | Understanding data |
| [VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md) | Exam prep | Before viva |

---

## 🎯 By Use Case

### "I just got the project"
→ Read: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

### "I want to run it"
→ Read: [docs/INSTALLATION.md](docs/INSTALLATION.md)

### "I need to understand how it works"
→ Read: [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md)

### "I need to explain it to examiners"
→ Read: [docs/VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md)

### "I need to modify the API"
→ Read: [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

### "I need to add database features"
→ Read: [database/schemas/DATABASE_SCHEMA.md](database/schemas/DATABASE_SCHEMA.md)

---

## 🚀 Quick Commands

### Start Project
```bash
cd localpulse
docker-compose up --build
```

### Access Services
```
Frontend:  http://localhost:5173
Backend:   http://localhost:3000
AI Engine: http://localhost:5000
MongoDB:   localhost:27017
```

### Test Backend
```bash
curl http://localhost:3000/health
```

### Test AI Engine
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Pothole on Main Street"}'
```

---

## 📊 Architecture at a Glance

```
┌─ Frontend (React) ─────┐
│  • Dashboard           │
│  • Report form         │
│  • Public map          │
└──────────┬─────────────┘
           │ HTTP REST
┌──────────▼──────────────────┐
│  Backend (Node.js)          │
│  • JWT auth                 │
│  • Complaint CRUD           │
│  • AI integration           │
└──────────┬──────────────┬───┘
           │ HTTP         │
    ┌──────▼────┐    ┌────▼──────────┐
    │ AI Engine  │    │ MongoDB       │
    │ (Python)   │    │ (Database)    │
    └────────────┘    └───────────────┘
```

---

## 🎓 Key Concepts

### Microservices
- Separate services for frontend, backend, AI
- Independent scaling & deployment
- Technology flexibility

### Machine Learning Pipeline
- Text preprocessing
- Category classification
- Severity prediction
- Department mapping
- Resolution time estimation

### JWT Authentication
- Token-based auth
- No session on server
- Stateless API

### MongoDB
- Document-oriented database
- Flexible schema
- Horizontal scalability

### Docker
- Containerization
- Environment consistency
- Easy deployment

---

## ✅ Features Implemented

### Citizen Side
✅ Register & login
✅ Report issues with location
✅ Track complaints
✅ View public map
✅ See statistics

### Admin Side
✅ View all complaints
✅ Filter & search
✅ Assign issues
✅ Update status
✅ View analytics

### Backend
✅ REST API
✅ JWT auth
✅ CRUD operations
✅ AI integration
✅ Error handling

### AI Engine
✅ Text preprocessing
✅ Classification
✅ Severity prediction
✅ Department mapping
✅ Time prediction

---

## 🔐 Security Features

✅ Password hashing (bcrypt)
✅ JWT authentication
✅ CORS protection
✅ Input validation
✅ Environment variables
✅ Error handling

---

## 📝 File Structure Tree

```
localpulse/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│   └── Dockerfile
│
├── ai-engine/
│   ├── inference/
│   ├── api/
│   ├── main.py
│   └── requirements.txt
│
├── database/
│   ├── schemas/
│   └── seed_data/
│
├── docs/
│   ├── SYSTEM_DESIGN.md
│   ├── API_DOCUMENTATION.md
│   ├── INSTALLATION.md
│   └── VIVA_PREPARATION.md
│
├── docker-compose.yml
├── README.md
├── PROJECT_SUMMARY.md
└── .gitignore
```

---

## 🎯 For Different Audiences

### Students
→ Focus on: [VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md)

### Developers
→ Focus on: [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) + [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

### DevOps
→ Focus on: [docs/INSTALLATION.md](docs/INSTALLATION.md) + docker-compose.yml

### Examiners
→ Focus on: [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) + [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 💡 Pro Tips

1. **Before viva**: Read [VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md)
2. **Before demo**: Test all endpoints with curl
3. **Before explaining**: Draw architecture on paper
4. **Before submitting**: Verify all .env files
5. **During viva**: Stay calm and explain clearly

---

## 🆘 Troubleshooting

### Port in use?
→ See: [docs/INSTALLATION.md#Troubleshooting](docs/INSTALLATION.md)

### DB connection error?
→ See: [docs/INSTALLATION.md#MongoDB Setup](docs/INSTALLATION.md)

### API not starting?
→ See: [docs/INSTALLATION.md#Backend Setup](docs/INSTALLATION.md)

### Can't understand architecture?
→ See: [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md)

---

## 📞 Help Resources

| Issue | Resource |
|-------|----------|
| Setup questions | [INSTALLATION.md](docs/INSTALLATION.md) |
| Architecture questions | [SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) |
| API questions | [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) |
| Database questions | [DATABASE_SCHEMA.md](database/schemas/DATABASE_SCHEMA.md) |
| Viva questions | [VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md) |

---

## ✨ Next Steps

1. **Read**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. **Setup**: Follow [docs/INSTALLATION.md](docs/INSTALLATION.md)
3. **Explore**: Browse source code
4. **Prepare**: Study [docs/VIVA_PREPARATION.md](docs/VIVA_PREPARATION.md)
5. **Practice**: Do demo multiple times
6. **Succeed**: 🎉 Ace your viva!

---

## 🎓 Final Words

This project is **production-ready** and covers all aspects:
- ✅ Modern architecture
- ✅ Machine learning
- ✅ Real working code
- ✅ Complete documentation
- ✅ Viva-ready explanations

**You're all set!** 🚀

---

**Happy learning and good luck!** 🎓✨
