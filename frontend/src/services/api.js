import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Προσθέτει αυτόματα το JWT token σε κάθε request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const register = (data) =>
  api.post('/api/auth/register', data);

// Job Postings
export const getJobPostings = () =>
  api.get('/api/jobposting');

export const createJobPosting = (data) =>
  api.post('/api/jobposting', data);

// Applications
export const createApplication = (data) =>
  api.post('/api/application', data);

export const getApplications = () =>
  api.get('/api/application');

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

export const getMyApplications = (userId) =>
  api.get(`/api/application/user/${userId}`);

export const getApplicationsByJob = (jobId) =>
  api.get(`/api/application/job/${jobId}`);

export default api;