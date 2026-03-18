import React, { useState } from 'react';import React, { useState } from 'react';























































































































};  );    </div>      </div>        </p>          </a>            Login          <a href="/login" className="text-blue-600 hover:underline">          Already have an account?{' '}        <p className="text-center text-sm text-gray-600 mt-4">        </form>          </button>            {loading ? 'Registering...' : 'Register'}          >            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"            disabled={loading}            type="submit"          <button          </div>            />              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"              onChange={handleChange}              value={formData.address}              name="address"            <textarea            <label className="block text-sm font-medium text-gray-700">Address</label>          <div>          </div>            />              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"              onChange={handleChange}              value={formData.phone}              name="phone"              type="tel"            <input            <label className="block text-sm font-medium text-gray-700">Phone</label>          <div>          </div>            />              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"              required              onChange={handleChange}              value={formData.password}              name="password"              type="password"            <input            <label className="block text-sm font-medium text-gray-700">Password</label>          <div>          </div>            />              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"              required              onChange={handleChange}              value={formData.email}              name="email"              type="email"            <input            <label className="block text-sm font-medium text-gray-700">Email</label>          <div>          </div>            />              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"              required              onChange={handleChange}              value={formData.name}              name="name"              type="text"            <input            <label className="block text-sm font-medium text-gray-700">Name</label>          <div>          )}            <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>          {error && (        <form onSubmit={handleSubmit} className="space-y-4">        </h1>          Join LocalPulse        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">      <div className="bg-white p-8 rounded-lg shadow-lg w-96">    <div className="flex items-center justify-center min-h-screen bg-gray-100">  return (  };    }      setLoading(false);    } finally {      setError(err.response?.data?.error || 'Registration failed');    } catch (err: any) {      navigate('/dashboard');      login(response.data.token, response.data.user);      const response = await authAPI.register(formData);    try {    setLoading(true);    e.preventDefault();  const handleSubmit = async (e: React.FormEvent) => {  };    });      [e.target.name]: e.target.value,      ...formData,    setFormData({  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  const navigate = useNavigate();  const { login } = useAuth();  const [loading, setLoading] = useState(false);  const [error, setError] = useState('');  });    address: '',    phone: '',    password: '',    email: '',    name: '',  const [formData, setFormData] = useState({export const RegisterPage: React.FC = () => {import { authAPI } from '../services/api';import { useAuth } from '../context/AuthContext';import { useNavigate } from 'react-router-dom';import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          LocalPulse
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
