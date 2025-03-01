import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authservice';
import { useToast } from '../../contexts/ToastContext';

const GoogleAuth = () => {
/* 
GoogleAuth Component
  
This component provides Google OAuth authentication functionality for the application.
It renders a Google login button that allows users to authenticate using their Google accounts.
  
Integration:
- Uses @react-oauth/google library for Google authentication
- Integrates with the application's AuthContext to manage authentication state
- Uses react-router for navigation after successful login
- Connects to authService to perform the backend authentication API call
- Uses ToastContext to display success/error messages to users
  
The component doesn't accept any props as it gets all necessary data from context providers
and environment variables.
*/
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