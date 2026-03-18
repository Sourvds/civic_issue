# LocalPulse - API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## Authentication

All endpoints (except login/register) require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth Endpoints

#### 1. Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+919876543210",
  "address": "123 Main Street"
}

Response: 200
{
  "token": "eyJhbGc...",
  "user": {
    "id": "507f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

#### 2. Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### 3. Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response: 200
{
  "id": "507f...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "citizen"
}
```

---

### Complaint Endpoints

#### 1. Create Complaint
```
POST /complaints
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Pothole on Main Street",
  "description": "Large pothole near railway station",
  "category": "Road",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Main Street, City"
  },
  "image": "base64-image-data"
}

Response: 201
{
  "_id": "507f...",
  "title": "Pothole on Main Street",
  "category": "Road",
  "severity": "High",
  "status": "submitted",
  "predictedResolutionDays": 7,
  "aiAnalysis": {
    "confidence": 0.95,
    "keywords": ["pothole", "main", "street"]
  }
}
```

#### 2. Get All Complaints
```
GET /complaints?status=submitted&severity=High&category=Road&page=1&limit=10
Authorization: Bearer <token>

Response: 200
{
  "complaints": [ ... ],
  "total": 47,
  "pages": 5
}
```

#### 3. Get Single Complaint
```
GET /complaints/:id
Authorization: Bearer <token>

Response: 200
{
  "_id": "507f...",
  "title": "...",
  "timeline": [ ... ]
}
```

#### 4. Get User's Complaints
```
GET /complaints/my-complaints
Authorization: Bearer <token>

Response: 200
[ ... ]
```

#### 5. Update Complaint Status
```
PATCH /complaints/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "comment": "Started working on it"
}

Response: 200
{ ... updated complaint ... }
```

#### 6. Assign Complaint
```
PATCH /complaints/:id/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "assignedTo": "507f1f77bcf86cd799439011"
}

Response: 200
{ ... updated complaint ... }
```

#### 7. Get Statistics
```
GET /complaints/stats
Authorization: Bearer <token>

Response: 200
{
  "totalComplaints": 150,
  "resolved": 45,
  "pending": 105,
  "bySeverity": [
    { "_id": "High", "count": 30 }
  ],
  "byCategory": [
    { "_id": "Road", "count": 50 }
  ]
}
```

---

### Department Endpoints

#### 1. Get All Departments
```
GET /departments
Authorization: Bearer <token>

Response: 200
[
  {
    "_id": "507f...",
    "name": "Road & Infrastructure",
    "code": "ROAD",
    "categories": ["Road"],
    "avgResolutionDays": 7
  }
]
```

#### 2. Get Single Department
```
GET /departments/:id
Authorization: Bearer <token>

Response: 200
{ ... }
```

#### 3. Create Department (Admin only)
```
POST /departments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Department",
  "code": "NEW",
  "categories": ["Category1"],
  "email": "dept@city.gov",
  "avgResolutionDays": 5
}

Response: 201
{ ... }
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Complaint not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---
