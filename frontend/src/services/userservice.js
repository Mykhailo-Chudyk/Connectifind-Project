import api from './apiservice';

const deleteUser = async () => {
  try {
    const response = await api.delete('users/delete/');
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response);
    throw error.response.data;
  }
};

const getUserInfo = async () => {
  const response = await api.get('users/get_user_info/');
  return response.data;
};

export default {
  deleteUser,
  getUserInfo,
};
