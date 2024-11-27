import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import "./styles.scss";

const Header = ({ isAuthenticated }) => {
  const { logout } = useContext(AuthContext);

  return (
    <header>
      <div className="header-container">
        <p>ConnectiFind</p>
        {isAuthenticated ?
        <div>

        </div> :
        <div className="header-buttons"> 
          <ButtonComponent text="Login" level="primary"/>
          <ButtonComponent text="Sign Up" level="secondary"/>
        </div>}
      </div>
      {/* {isAuthenticated ? (
        <nav>
          <p>Welcome, User!</p>
          <a href="/events">Events</a>
          <a href="/me/profile">Profile</a>
          <a href="/me/settings">Settings</a>
          <button onClick={logout}>Logout</button>
        </nav>
      ) : (
        <nav>
          <p>Welcome, Guest!</p>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
      )} */}
    </header>
  );
};

export default Header;