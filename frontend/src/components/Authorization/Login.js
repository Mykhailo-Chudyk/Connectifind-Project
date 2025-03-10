import React, { useState, useContext } from 'react';
import authService from '../../services/authservice.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';
import InputComponent from '../InputComponent/InputComponent.js';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FaGoogle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import './styles.scss';
import { useToast } from '../../contexts/ToastContext';
import GoogleAuth from '../GoogleAuth/GoogleAuth.js';

const LoginForm = () => {
  /* 
  Login component that provides user authentication functionality.
  
  This component renders a login form that allows users to sign in using either:
  - Email and password authentication
  - Google authentication via the GoogleAuth component
  
  The component is integrated within the application's authentication flow and 
  is accessible via the /login route. Upon successful login, the user is redirected 
  to the home page, and the authentication token is stored in the AuthContext.
  
  State:
  - email: String value that stores the user's input email
  - password: String value that stores the user's input password
  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(email, password);
      login(res.access);
      navigate('/'); 
    } catch (error) {
      // add .response.data.message if available
      showToast(error?.response?.data?.error || 'Login failed', 'error');
    }
  };

  return (
    <div className="authorization-container-wrapper">
    <div className="authorization-container">
      <h1>ConnectiFind</h1>
      <h2 className="sign-in-title">Sign in</h2>
      <div className="input-wrapper">
        <GoogleAuth />
      </div>
      <div className="or-line">
        <span>OR</span>
      </div>
      <div className="input-wrapper">
        <InputComponent icon={<FontAwesomeIcon icon={faEnvelope} />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>
      <div className="input-wrapper">
        <InputComponent icon={<FontAwesomeIcon icon={faLock} />} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div className="help-links">
        {/* TODO: add links */}
        {/* <a href="#">Forgot your password?</a>  */}
        <a href="/signup">Don't have an account yet?</a>
      </div>
      <ButtonComponent text="Sign in" level="secondary" size="large" onClick={handleLogin} />
    </div>
    </div>
  );
};

export default LoginForm;