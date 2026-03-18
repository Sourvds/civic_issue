import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComplaintForm } from '../components/ComplaintForm';
import { complaintAPI } from '../services/api';

export const ReportIssuePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await complaintAPI.createComplaint(data);
      alert('Complaint submitted successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      alert('Error submitting complaint: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <ComplaintForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};
