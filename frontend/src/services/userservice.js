import api from './apiService';

const deleteUser = async () => {
  try {
    const response = await api.delete('users/delete/');
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response);
    throw error.response.data;
  }
};

export default {
  deleteUser,
};
