import axios from 'axios';

const API_URL = 'http://localhost:8000/'; // will be later replaced with the .env variable

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
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access) {
    return { Authorization: `Bearer ${user.access}` };
  } else {
    return {};
  }
};

export default {
  register,
};