import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const GOOGLE_OAUTH2_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID;

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, userData);
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('There was an error registering the user:', error.response);
    throw error.response.data;
  }
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login/`, { email, password });
  if (response.data.access) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authHeader = () => {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    return { Authorization: `Bearer ${userToken}` };
  } else {
    return {};
  }
};

const googleLogin = async (token) => {
  try {
    const response = await axios.post(`${API_URL}google-auth/`, { token });
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error during Google authentication:', error.response);
    throw error.response.data;
  }
};

export default {
  register,
  logout,
  login,
  authHeader,
  googleLogin,
  API_URL,
};