import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

export const complaintAPI = {
  createComplaint: (data: any) => apiClient.post('/complaints', data),
  getAllComplaints: (params: any) => apiClient.get('/complaints', { params }),
  getComplaintById: (id: string) => apiClient.get(`/complaints/${id}`),
  getUserComplaints: () => apiClient.get('/complaints/my-complaints'),
  updateComplaintStatus: (id: string, data: any) =>
    apiClient.patch(`/complaints/${id}/status`, data),
  assignComplaint: (id: string, data: any) =>
    apiClient.patch(`/complaints/${id}/assign`, data),
  getStats: () => apiClient.get('/complaints/stats'),
};

export const departmentAPI = {
  getAllDepartments: () => apiClient.get('/departments'),
  getDepartmentById: (id: string) => apiClient.get(`/departments/${id}`),
};

export default apiClient;
