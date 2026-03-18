# LocalPulse - Database Schema

## Collections

### 1. Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String enum: ["citizen", "admin", "department"],
  phone: String,
  address: String,
  profileImage: String (URL),
  createdAt: Date default: current,
  updatedAt: Date default: current
}

// Indexes
db.users.createIndex({ email: 1 }, { unique: true });
```

---

### 2. Complaints
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  category: String enum: ["Road", "Water", "Electricity", "Sanitation", "Other"],
  severity: String enum: ["Low", "Medium", "High", "Critical"],
  status: String enum: ["submitted", "assigned", "in-progress", "resolved", "closed"],
  
  // Location
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  
  // Media
  image: String (URL),
  
  // User References
  citizenId: ObjectId (ref: User, required),
  assignedTo: ObjectId (ref: User),
  
  // AI Analysis
  aiAnalysis: {
    confidence: Number (0-1),
    keywords: [String],
    timestamp: Date
  },
  
  // Prediction
  predictedResolutionDays: Number (default: 7),
  
  // Status Timeline
  timeline: [{
    status: String,
    timestamp: Date,
    comment: String
  }],
  
  createdAt: Date default: current,
  updatedAt: Date default: current
}

// Indexes
db.complaints.createIndex({ citizenId: 1 });
db.complaints.createIndex({ status: 1 });
db.complaints.createIndex({ category: 1 });
db.complaints.createIndex({ severity: 1 });
db.complaints.createIndex({ createdAt: -1 });
db.complaints.createIndex({ "location.latitude": 1, "location.longitude": 1 });
```

---

### 3. Departments
```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  code: String (unique, required),
  categories: [String], // e.g., ["Road", "Electricity"]
  email: String,
  phone: String,
  head: String (name of department head),
  avgResolutionDays: Number (default: 7),
  createdAt: Date default: current
}

// Index
db.departments.createIndex({ code: 1 }, { unique: true });
db.departments.createIndex({ categories: 1 });
```

---

### 4. Logs (Optional)
```javascript
{
  _id: ObjectId,
  action: String, // "complaint_created", "status_updated"
  userId: ObjectId (ref: User),
  complainantId: ObjectId (ref: Complaint),
  details: Object,
  timestamp: Date default: current
}
```

---

## Relationships

```
User (1) ──── (M) Complaint
         └─ as citizenId

User (1) ──── (M) Complaint
         └─ as assignedTo

Department (1) ──── (M) Complaint
               └─ matches by category
```

---

## Sample Data

### Department
```javascript
db.departments.insertOne({
  name: "Road & Infrastructure",
  code: "ROAD",
  categories: ["Road"],
  email: "road@city.gov",
  phone: "+1-800-ROAD",
  avgResolutionDays: 7
});
```

### User
```javascript
db.users.insertOne({
  name: "John Citizen",
  email: "john@example.com",
  password: "$2b$10$...", // bcrypt hash
  role: "citizen",
  phone: "+919876543210",
  address: "123 Main St",
  createdAt: new Date()
});
```

### Complaint
```javascript
db.complaints.insertOne({
  title: "Pothole on Main Street",
  description: "Large pothole dangerous for vehicles",
  category: "Road",
  severity: "High",
  status: "submitted",
  location: {
    latitude: 28.6139,
    longitude: 77.2090,
    address: "Main Street"
  },
  citizenId: ObjectId("..."),
  aiAnalysis: {
    confidence: 0.95,
    keywords: ["pothole", "main", "street"],
    timestamp: new Date()
  },
  predictedResolutionDays: 7,
  timeline: [{
    status: "submitted",
    timestamp: new Date(),
    comment: "Complaint submitted"
  }],
  createdAt: new Date(),
  updatedAt: new Date()
});
```

---

## Query Examples

### 1. Get all high severity complaints
```javascript
db.complaints.find({ severity: "High" });
```

### 2. Get complaints by status
```javascript
db.complaints.find({ status: "in-progress" });
```

### 3. Get user's complaints
```javascript
db.complaints.find({ citizenId: ObjectId("...") });
```

### 4. Get complaints near a location
```javascript
db.complaints.find({
  "location.latitude": { $gte: 28.60, $lte: 28.62 },
  "location.longitude": { $gte: 77.20, $lte: 77.22 }
});
```

### 5. Get complaints assigned to a user
```javascript
db.complaints.find({ assignedTo: ObjectId("...") });
```

### 6. Get complaints by category
```javascript
db.complaints.find({ category: "Road" });
```

### 7. Get statistics by category
```javascript
db.complaints.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
]);
```

### 8. Get resolved complaints in last 7 days
```javascript
db.complaints.find({
  status: "resolved",
  updatedAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
});
```

---

## Backup

### Export
```bash
mongodump --db localpulse --out ./backup
```

### Import
```bash
mongorestore --db localpulse ./backup/localpulse
```

---
