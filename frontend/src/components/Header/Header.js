import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import IconComponent from '../IconComponent/IconComponent.js';
import { useNavigate } from 'react-router-dom';
import "./styles.scss";

const Header = ({ isAuthenticated }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header>
      <div className={`header-container`}>
        <h2 onClick={() => navigate('/')} style={{cursor: "pointer"}}>ConnectiFind</h2>
        {isAuthenticated ?
        <div className="header-buttons"> 
          <ButtonComponent text="Browse Events" level="primary" onClick={() => {
            navigate('/events');
          }}/>
          <ButtonComponent text="Create" level="secondary" onClick={() => {
            navigate('/add-event');
          }}/>
          <IconComponent icon={null} nameToShow={"MC"} selected={true} /> 
          {/* todo: pass parameter with user information */}
        </div>:
        <div className="header-buttons"> 
          <ButtonComponent text="Login" level="primary" onClick={() => {
            navigate('/login');
          }}/>
          <ButtonComponent text="Sign Up" level="secondary" onClick={() => {
            navigate('/signup');
          }}/>
        </div>}
      </div>
    </header>
  );
};

export default Header;