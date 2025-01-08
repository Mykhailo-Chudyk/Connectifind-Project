import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faPlus, faArrowLeft, faList, faComments, faUsers } from '@fortawesome/free-solid-svg-icons';
import IconComponent from '../IconComponent/IconComponent';
import AlertModal from '../AlertModal/AlertModal';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserEvents } from '../../redux/actions/eventActions';
import eventservice from '../../services/eventservice';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.events.events);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserEvents());
  }, [dispatch]);

  // Determine which icon should be selected based on the current path
  console.log(location.pathname);
  const getSelectedIcon = () => {
    if (location.pathname.startsWith('/me')) return 'profile';
    if (location.pathname.startsWith('/settings')) return 'settings';
    if (location.pathname.startsWith('/event/')) return 'event';
    if (location.pathname === '/events' || location.pathname === '/events/') return 'events';
    return 'home';
  };

  const [eventDetails, setEventDetails] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventservice.getEventById(eventId);
        setEventDetails(details);
        setLoading(false);
      } catch (err) {
        console.error('Error retrieving event:', err);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const selectedIcon = getSelectedIcon();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    onLogout();
    navigate('/');
    setShowLogoutModal(false);
  };

  if (loading && location.pathname.startsWith('/event/')) {
    return <div></div>;
  }

  return (
    <>
      <div className="sidebar">
        <div className={`sidebar-content ${location.pathname.startsWith('/event/') ? 'event-mode' : 'default-mode'}`}>
          <div className="sidebar-icons default">
            <IconComponent
              icon={<FontAwesomeIcon icon={faHome} />}
              selected={selectedIcon === 'home'}
              isFaComponent={true}
              onClick={() => navigate('/')}
            />
            <IconComponent
              icon={<FontAwesomeIcon icon={faUser} />}
              selected={selectedIcon === 'profile'}
              onClick={() => navigate('/me')}
              isFaComponent={true}
            />
            <IconComponent
              icon={<FontAwesomeIcon icon={faCog} />}
              selected={selectedIcon === 'settings'}
              onClick={() => navigate('/settings')}
              isFaComponent={true}
            />
            <IconComponent
              icon={<FontAwesomeIcon icon={faSignOutAlt} />}
              isFaComponent={true}
              onClick={handleLogout}
            />
            <div className="divider" />
            {userEvents.map((event) => (
              <IconComponent
                key={event.id}
                icon={event.image}
                isFaComponent={false}
                nameToShow={event?.title[0]}
                selected={true}
                onClick={() => navigate(`/event/${event.id}/about`)}
              />
            ))}
            <IconComponent
              icon={<FontAwesomeIcon icon={faPlus} />}
              isFaComponent={true}
              selected={selectedIcon === 'events'}
              onClick={() => navigate('/events')}
            />
          </div>
          <div className="sidebar-icons event">
            {eventDetails && (
              <>
                <IconComponent
                  key={eventDetails.id}
                  icon={eventDetails?.image}
                  isFaComponent={false}
                  nameToShow={eventDetails?.title[0]}
                  selected={location.pathname.endsWith(`/about`)}
                  onClick={() => navigate(`/event/${eventDetails.id}/about`)}
                />
                <IconComponent
                  icon={<FontAwesomeIcon icon={faUser} />}
                  selected={location.pathname.endsWith(`/me`)}
                  onClick={() => navigate(`/event/${eventDetails.id}/me`)}
                  isFaComponent={true}
                />
                <IconComponent
                  icon={<FontAwesomeIcon icon={faList} />}
                  selected={location.pathname.endsWith(`/feed`)}
                  onClick={() => navigate(`/event/${eventDetails.id}/feed`)}
                  isFaComponent={true}
                />
                <IconComponent
                  icon={<FontAwesomeIcon icon={faComments} />}
                  selected={location.pathname.endsWith(`/chats`)}
                  onClick={() => navigate(`/event/${eventDetails.id}/chats`)}
                  isFaComponent={true}
                />
                <IconComponent
                  icon={<FontAwesomeIcon icon={faUsers} />}
                  selected={location.pathname.endsWith(`/people`)}
                  onClick={() => navigate(`/event/${eventDetails.id}/people`)}
                  isFaComponent={true}
                />
                <div className="divider" />
                <IconComponent
                  icon={<FontAwesomeIcon icon={faArrowLeft} />}
                  isFaComponent={true}
                  onClick={() => navigate('/')}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <AlertModal
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onContinue={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
          continueText="Logout"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default Sidebar;