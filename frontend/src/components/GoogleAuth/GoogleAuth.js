import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authservice';
import { useToast } from '../../contexts/ToastContext';

const GoogleAuth = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const clientId = process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID;

  const handleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }
      const response = await authService.googleLogin(credentialResponse.credential);
      login(response.access);
      navigate('/');
    } catch (error) {
      console.error('Google auth error:', error);
      showToast(error?.response?.data?.error || 'Google authentication failed', 'error');
    }
  };

  const handleError = (error) => {
    console.error('Google auth error:', error);
    showToast('Google authentication failed', 'error');
  };

  if (!clientId) {
    console.error('Google OAuth client ID is not configured');
    return null;
  }

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