import axios from 'axios';
import authService from './authservice';

const API_URL = process.env.REACT_APP_API_URL || 'https://connectifind-cad362d2d3b8.herokuapp.com';

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