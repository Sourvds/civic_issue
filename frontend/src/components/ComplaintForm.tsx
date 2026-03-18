import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface ComplaintFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

// Fix Leaflet marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: 'Other',
      location: { latitude: 28.6139, longitude: 77.2090 },
      image: null,
    },
  });

  const [location, setLocation] = useState({ latitude: 28.6139, longitude: 77.2090 });

  const handleMapClick = (e: any) => {
    setLocation({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Report a Civic Issue</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Pothole on Main Street"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe the issue in detail..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pick Location on Map
        </label>
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={12}
          style={{ height: '300px', borderRadius: '0.375rem' }}
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Selected Location</Popup>
          </Marker>
        </MapContainer>
        <p className="text-xs text-gray-500 mt-1">
          Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isLoading ? 'Submitting...' : 'Submit Complaint'}
      </button>
    </form>
  );
};
