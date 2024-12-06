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

const updateUserProfile = async (profileData) => {
  try {
    const response = await api.post('users/update_profile/', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error.response);
    throw error.response.data;
  }
};

export default {
  deleteUser, 
  getUserInfo,
  updateUserProfile,
};
