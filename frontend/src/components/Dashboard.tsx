import React, { useState, useEffect } from 'react';
import { complaintAPI } from '../services/api';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolved: 0,
    pending: 0,
    bySeverity: [],
    byCategory: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await complaintAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Total Complaints</h3>
        <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalComplaints}</p>
      </div>
      <div className="bg-green-50 p-6 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Resolved</h3>
        <p className="text-4xl font-bold text-green-600 mt-2">{stats.resolved}</p>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
        <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Resolution Rate</h3>
        <p className="text-4xl font-bold text-blue-600 mt-2">
          {stats.totalComplaints > 0 ? Math.round((stats.resolved / stats.totalComplaints) * 100) : 0}%
        </p>
      </div>
    </div>
  );
};
