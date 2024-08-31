import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const tokenConfig = config;
  const headers = authService.authHeader();
  tokenConfig.headers.Authorization = headers.Authorization;
  return tokenConfig;
});

export default api;