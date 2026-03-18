import React, { useState, useEffect } from 'react';
import { Dashboard } from '../components/Dashboard';
import { ComplaintList } from '../components/ComplaintList';
import { complaintAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    category: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, [filters]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await complaintAPI.getUserComplaints();
      let data = response.data;

      if (filters.status) data = data.filter((c: any) => c.status === filters.status);
      if (filters.severity) data = data.filter((c: any) => c.severity === filters.severity);
      if (filters.category) data = data.filter((c: any) => c.category === filters.category);

      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4">
      <Dashboard />

      <div className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Complaints</h2>

        <div className="flex gap-4 mb-6">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ComplaintList
            complaints={complaints}
            onSelectComplaint={(id) => navigate(`/complaint/${id}`)}
          />
        )}
      </div>
    </div>
  );
};
