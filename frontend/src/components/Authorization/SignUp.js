import React, { useState, useContext } from 'react';
import authService from '../../services/authservice.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext.js';
import InputComponent from '../InputComponent/InputComponent.js';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaGoogle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import './styles.scss';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.register(formData);
      login(data.access); 
      navigate('/'); 
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="authorization-container">
      <h1>ConnectiFind</h1>
      <h2 className="sign-in-title">Sign Up</h2>
      <div className="input-wrapper">
        <div className="google-auth-container">
          <FaGoogle className="google-icon" />
          <span>Continue with Google</span>
        </div>
      </div>
      <div className="or-line">
        <span>OR</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <InputComponent icon={<FontAwesomeIcon icon={faUser} />} type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        </div>
        <div className="input-wrapper">
          <InputComponent icon={<FontAwesomeIcon icon={faUser} />} type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        </div>
        <div className="input-wrapper">
          <InputComponent icon={<FontAwesomeIcon icon={faEnvelope} />} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="input-wrapper">
          <InputComponent icon={<FontAwesomeIcon icon={faLock} />} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        </div>
        <div className="help-links">
          <a href="/login">Already have an account?</a>
        </div>
        <ButtonComponent text="Sign Up" level="secondary" size="large" />
      </form>
    </div>
  );
};

export default RegisterForm;