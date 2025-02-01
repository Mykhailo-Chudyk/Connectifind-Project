import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authservice';
import { useToast } from '../../contexts/ToastContext';

const GoogleAuth = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await authService.googleLogin(credentialResponse.credential);
      login(response.access);
      navigate('/');
    } catch (error) {
      showToast(error?.message || 'Google authentication failed', 'error');
    }
  };

  const handleError = () => {
    showToast('Google authentication failed', 'error');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
      theme="outline"
      size="large"
      width="max(100%, 400px)"
      text="continue_with"
      type="standard"
      shape="rectangular"
    />
  );
};

export default GoogleAuth; 