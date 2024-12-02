import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import IconComponent from '../IconComponent/IconComponent.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./styles.scss";

const Header = ({ isAuthenticated }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

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
          <IconComponent icon={null} nameToShow={user?.first_name[0] + user?.last_name[0]} selected={true} /> 
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