db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "root", db: "admin" }]
});

db = db.getSiblingDB("localpulse");

db.createCollection("users");
db.createCollection("complaints");
db.createCollection("departments");

db.users.createIndex({ email: 1 }, { unique: true });
db.complaints.createIndex({ citizenId: 1 });
db.complaints.createIndex({ status: 1 });
db.complaints.createIndex({ createdAt: 1 });

db.departments.insertMany([
  {
    name: "Road & Infrastructure",
    code: "ROAD",
    categories: ["Road"],
    email: "road@city.gov",
    phone: "+1-800-ROAD",
    avgResolutionDays: 7
  },
  {
    name: "Water Supply & Drainage",
    code: "WATER",
    categories: ["Water"],
    email: "water@city.gov",
    phone: "+1-800-WATER",
    avgResolutionDays: 5
  },
  {
    name: "Electricity Board",
    code: "ELEC",
    categories: ["Electricity"],
    email: "power@city.gov",
    phone: "+1-800-ELEC",
    avgResolutionDays: 3
  },
  {
    name: "Sanitation & Cleanliness",
    code: "SANI",
    categories: ["Sanitation"],
    email: "sanitation@city.gov",
    phone: "+1-800-SANI",
    avgResolutionDays: 4
  }
]);

print("Database initialized!");
