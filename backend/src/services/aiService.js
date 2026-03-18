const axios = require('axios');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:5000';

class AIService {
  async analyzeComplaint(text) {
    try {
      const response = await axios.post(`${AI_ENGINE_URL}/analyze`, {
        text: text,
      });

      return {
        category: response.data.category,
        severity: response.data.severity,
        department: response.data.department,
        confidence: response.data.confidence,
        keywords: response.data.keywords,
        predictedResolutionDays: response.data.resolution_days || 7,
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      // Return default values on error
      return {
        category: 'Other',
        severity: 'Medium',
        department: 'General',
        confidence: 0.5,
        keywords: [],
        predictedResolutionDays: 7,
      };
    }
  }

  async bulkAnalyze(complaints) {
    return Promise.all(
      complaints.map(complaint => this.analyzeComplaint(complaint.description))
    );
  }
}

module.exports = new AIService();
