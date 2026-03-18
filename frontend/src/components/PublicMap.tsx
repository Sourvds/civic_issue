import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { complaintAPI } from '../services/api';

interface Complaint {
  _id: string;
  title: string;
  severity: string;
  location: { latitude: number; longitude: number };
  category: string;
  status: string;
}

export const PublicMap: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await complaintAPI.getAllComplaints({ limit: 1000 });
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return '#DC2626';
      case 'High':
        return '#EA580C';
      case 'Medium':
        return '#FCD34D';
      case 'Low':
        return '#22C55E';
      default:
        return '#6B7280';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading map...</div>;
  }

  return (
    <div className="h-screen">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {complaints.map((complaint) => (
          <CircleMarker
            key={complaint._id}
            center={[complaint.location.latitude, complaint.location.longitude]}
            radius={8}
            color={getSeverityColor(complaint.severity)}
            weight={2}
            opacity={0.8}
            fillOpacity={0.7}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{complaint.title}</h3>
                <p className="text-sm">Category: {complaint.category}</p>
                <p className="text-sm">Severity: {complaint.severity}</p>
                <p className="text-sm">Status: {complaint.status}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
