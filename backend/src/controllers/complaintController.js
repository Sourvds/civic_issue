const Complaint = require('../models/Complaint');
const aiService = require('../services/aiService');

class ComplaintController {
  async createComplaint(req, res) {
    try {
      const { title, description, location, image } = req.body;

      // Create complaint
      let complaint = new Complaint({
        title,
        description,
        location,
        image,
        citizenId: req.userId,
      });

      // Analyze with AI
      const aiResult = await aiService.analyzeComplaint(description);
      
      complaint.category = aiResult.category;
      complaint.severity = aiResult.severity;
      complaint.department = aiResult.department;
      complaint.predictedResolutionDays = aiResult.predictedResolutionDays;
      complaint.aiAnalysis = {
        confidence: aiResult.confidence,
        keywords: aiResult.keywords,
        timestamp: new Date(),
      };

      // Add initial timeline
      complaint.timeline.push({
        status: 'submitted',
        timestamp: new Date(),
        comment: 'Complaint submitted',
      });

      await complaint.save();

      res.status(201).json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllComplaints(req, res) {
    try {
      const { status, severity, category, page = 1, limit = 10 } = req.query;
      const filter = {};

      if (status) filter.status = status;
      if (severity) filter.severity = severity;
      if (category) filter.category = category;

      const skip = (page - 1) * limit;

      const complaints = await Complaint.find(filter)
        .populate('citizenId', 'name email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Complaint.countDocuments(filter);

      res.json({
        complaints,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getComplaintById(req, res) {
    try {
      const complaint = await Complaint.findById(req.params.id)
        .populate('citizenId', 'name email phone')
        .populate('assignedTo', 'name email');

      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      res.json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserComplaints(req, res) {
    try {
      const complaints = await Complaint.find({ citizenId: req.userId })
        .sort({ createdAt: -1 });

      res.json(complaints);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateComplaintStatus(req, res) {
    try {
      const { status, comment } = req.body;
      const complaint = await Complaint.findById(req.params.id);

      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      complaint.status = status;
      complaint.timeline.push({
        status,
        timestamp: new Date(),
        comment,
      });
      complaint.updatedAt = new Date();

      await complaint.save();

      res.json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async assignComplaint(req, res) {
    try {
      const { assignedTo } = req.body;
      const complaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        { assignedTo, status: 'assigned' },
        { new: true }
      );

      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      res.json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getStats(req, res) {
    try {
      const totalComplaints = await Complaint.countDocuments();
      const resolved = await Complaint.countDocuments({ status: 'resolved' });
      const pending = await Complaint.countDocuments({ status: 'submitted' });

      const bySeverity = await Complaint.aggregate([
        { $group: { _id: '$severity', count: { $sum: 1 } } },
      ]);

      const byCategory = await Complaint.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]);

      res.json({
        totalComplaints,
        resolved,
        pending,
        bySeverity,
        byCategory,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ComplaintController();
