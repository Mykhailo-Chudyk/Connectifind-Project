import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import IconComponent from '../IconComponent/IconComponent.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/connectifind.png';
import useDeviceType from '../../hooks/useDeviceType';
import "./styles.scss";

const Header = ({ isAuthenticated }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [searchQuery, setSearchQuery] = useState('');
  const { isMobile } = useDeviceType();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header>
      <div className={`header-container`}>
        <h3 onClick={() => navigate('/')} style={{cursor: "pointer"}}>ConnectiFind</h3>
        {/* <img className="logo" src={logo} alt="ConnectiFind" onClick={() => navigate('/')} style={{cursor: "pointer"}}/> */}
        {!isMobile ? <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button type="button" className="clear-button" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div> : null}
        {isAuthenticated ?
        <div className="header-buttons"> 
          <ButtonComponent text="Explore" level="primary" onClick={() => {
            navigate('/events');
          }}/>
          <ButtonComponent text="Create" level="secondary" onClick={() => {
            navigate('/add-event');
          }}/>
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