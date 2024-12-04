import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import IconComponent from '../IconComponent/IconComponent';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserEvents } from '../../redux/actions/eventActions';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.events.events);

  useEffect(() => {
    dispatch(fetchUserEvents());
  }, [dispatch]);

  // Determine which icon should be selected based on the current path
  const getSelectedIcon = () => {
    if (location.pathname.startsWith('/me/profile')) return 'profile';
    if (location.pathname.startsWith('/me/settings')) return 'settings';
    if (location.pathname.startsWith('/event/')) return 'event';
    if (location.pathname.startsWith('/add-event')) return 'add-event';
    return 'home';
  };

  const selectedIcon = getSelectedIcon();

  return (
    <div className="sidebar">
      <IconComponent
        icon={<FontAwesomeIcon icon={faHome} />}
        selected={selectedIcon === 'home'}
        isFaComponent={true}
        onClick={() => navigate('/')}
      />
      <IconComponent
        icon={<FontAwesomeIcon icon={faUser} />}
        selected={selectedIcon === 'profile'}
        onClick={() => navigate('/me/profile')}
        isFaComponent={true}
      />
      <IconComponent
        icon={<FontAwesomeIcon icon={faCog} />}
        selected={selectedIcon === 'settings'}
        onClick={() => navigate('/me/settings')}
        isFaComponent={true}
      />
      <IconComponent
        icon={<FontAwesomeIcon icon={faSignOutAlt} />}
        isFaComponent={true}
        onClick={() => {onLogout(); navigate('/')}}
      />
      <div className="divider" />
      {/* Render user events */}
      {userEvents.map((event) => (
        <IconComponent
          key={event.id}
          icon={event.icon}
          isFaComponent={false}
          nameToShow={event?.title[0]}
          selected={selectedIcon === 'event' && location.pathname.startsWith(`/event/${event.id}`)}
          onClick={() => navigate(`/event/${event.id}/about`)}
        />
      ))}
      <IconComponent
        icon={<FontAwesomeIcon icon={faPlus} />}
        isFaComponent={true}
        selected={selectedIcon === 'add-event'}
        onClick={() => navigate('/add-event')}
      />
    </div>
  );
};

export default Sidebar;