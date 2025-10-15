import axios from 'axios';

const api = axios.create({
  baseURL: 'https://automatrix-h2js.onrender.com/api', // baseURL includes /api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Include JWT automatically if present
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
