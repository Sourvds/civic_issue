const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Road', 'Water', 'Electricity', 'Sanitation', 'Other'],
    default: 'Other',
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  department: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['submitted', 'assigned', 'in-progress', 'resolved', 'closed'],
    default: 'submitted',
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  image: String,
  citizenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  predictedResolutionDays: {
    type: Number,
    default: 7,
  },
  aiAnalysis: {
    confidence: Number,
    keywords: [String],
    timestamp: Date,
  },
  timeline: [{
    status: String,
    timestamp: Date,
    comment: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);
