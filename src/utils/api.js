import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API base URL
});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default API;