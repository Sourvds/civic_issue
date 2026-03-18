import React from 'react';
import { useAuth } from '../context/AuthContext';

interface Complaint {
  _id: string;
  title: string;
  severity: string;
  status: string;
  category: string;
  createdAt: string;
}

interface ComplaintListProps {
  complaints: Complaint[];
  onSelectComplaint?: (id: string) => void;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({
  complaints,
  onSelectComplaint,
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'assigned':
        return 'bg-yellow-500';
      case 'submitted':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          onClick={() => onSelectComplaint?.(complaint._id)}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Category: {complaint.category}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                  complaint.severity
                )}`}
              >
                {complaint.severity}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
