import React, { useState, useContext } from 'react';
import authService from '../../services/authservice.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext.js';
import InputComponent from '../InputComponent/InputComponent.js';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import './styles.scss';
import { useToast } from '../../contexts/ToastContext';
import GoogleAuth from '../GoogleAuth/GoogleAuth.js';

const RegisterForm = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.register(formData);
      login(data.access); 
      navigate('/'); 
    } catch (error) {
      showToast(error?.response?.data?.error || 'Registration failed', 'error');
    }
  };

  return (
    <div className="authorization-container-wrapper">
      <div className="authorization-container">
        <h1>ConnectiFind</h1>
        <h2 className="sign-in-title">Sign Up</h2>
        <div className="input-wrapper">
          <GoogleAuth />
        </div>
        <div className="or-line">
          <span>OR</span>
        </div>
        <div className="input-wrapper">
          <InputComponent 
            icon={<FontAwesomeIcon icon={faUser} />} 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
            placeholder="First Name" 
          />
        </div>
        <div className="input-wrapper">
          <InputComponent 
            icon={<FontAwesomeIcon icon={faUser} />} 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
            placeholder="Last Name" 
          />
        </div>
        <div className="input-wrapper">
          <InputComponent 
            icon={<FontAwesomeIcon icon={faEnvelope} />} 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            placeholder="Email" 
          />
        </div>
        <div className="input-wrapper">
          <InputComponent 
            icon={<FontAwesomeIcon icon={faLock} />} 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            placeholder="Password" 
          />
        </div>
        <div className="help-links">
          <a href="/login">Already have an account?</a>
        </div>
        <ButtonComponent 
          text="Sign Up" 
          level="secondary" 
          size="large" 
          onClick={handleSubmit} 
        />
      </div>
    </div>
  );
};

export default RegisterForm;