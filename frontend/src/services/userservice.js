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
    const formData = new FormData();
    
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('description', profileData.description);
    
    if (profileData.avatar !== undefined) {
      formData.append('avatar', profileData.avatar);
    }

    if (profileData.university !== undefined) {
      formData.append('university', profileData.university);
    }
    
    if (profileData.hometown !== undefined) {
      formData.append('hometown', profileData.hometown);
    }
    
    if (profileData.workplace !== undefined) {
      formData.append('workplace', profileData.workplace);
    }

    const response = await api.post('users/update_profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error.response);
    throw error.response.data;
  }
};

const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('users/change_password/', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error.response);
    throw error.response.data;
  }
};

const deleteAccount = async () => {
  try {
    const response = await api.delete('users/delete_account/');
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error.response);
    throw error.response.data;
  }
};

export default {
  deleteUser, 
  getUserInfo,
  updateUserProfile,
  changePassword,
  deleteAccount,
};
