import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import useDeviceType from '../../hooks/useDeviceType';

const MyEventPerson = ({ eventDetails }) => {
    /* 
    MyEventPerson Component
    
    This component displays detailed information about a specific participant in an event.
    It shows their name, goal, description, and provides navigation options.
    The component adapts its layout based on whether it's viewed on mobile or desktop.
    
    Props:
      eventDetails - Object containing event information including:
        - id: string - The ID of the event
        - participants: array - List of participants with their details
    
    Navigation:
    - Back arrow returns to the event's people list
    - Message button navigates to chat with the specific person
    */
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const { isMobile } = useDeviceType();

    useEffect(() => {
        const lastId = location.pathname.split('/').pop();

        const foundUser = eventDetails?.participants.find(participant => participant.id === lastId);
        if (foundUser) {
            setUser(foundUser);
        }
    }, [location.pathname, eventDetails]);



    return (
        <>
            {user ? (
                <div className={`person-container ${isMobile ? 'mobile' : ''}`}>
                    <div className="person-header">
                        <div className="person-header-left">
                            <div className="person-header-left-arrow">  
                                <span className='back-arrow' onClick={() => navigate('/event/' + eventDetails?.id + '/people')}>←</span>
                                <h1>{user.first_name} {user.last_name}</h1>
                            </div>
                            {user.goal && <h3 className="person-goal">Goal: {user.goal}</h3>}
                            <div className="person-description">
                                {user.description && <p>{user.description}</p>} 
                            </div>
                            <div className="person-actions">    
                                <ButtonComponent text="Message" level="secondary" onClick={() => navigate('/event/' + eventDetails?.id + '/chats/' + user.id)} width="150px" />
                            </div>
                        </div>
                        {!isMobile && <div className="person-header-right">
                            {user?.avatar ? <div className="person-header-avatar"><img src={user?.avatar} alt="Default profile avatar" /></div> : <FontAwesomeIcon icon={faUserCircle} />}
                        </div>}
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </>
    );
};

export default MyEventPerson;
