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

    // Basic HTML sanitization function
    const sanitizeHtml = (html) => {
        if (!html) return '';
        // Remove script tags and their content
        return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                  .replace(/on\w+="[^"]*"/g, '') // Remove event handlers
                  .replace(/on\w+='[^']*'/g, ''); // Remove event handlers
    };

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
                            {user.goal && (
                                <h3 className="person-goal" dangerouslySetInnerHTML={{ __html: sanitizeHtml(user.goal) }} />
                            )}
                            <div className="person-description">
                                {user.description && (
                                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(user.description) }} />
                                )}
                            </div>
                            <div className="person-profile-details">
                                {user.university && (
                                    <div className="profile-detail-item">
                                        <span className="profile-detail-label">University:</span>
                                        <span className="profile-detail-value">{user.university}</span>
                                    </div>
                                )}
                                {user.hometown && (
                                    <div className="profile-detail-item">
                                        <span className="profile-detail-label">Hometown:</span>
                                        <span className="profile-detail-value">{user.hometown}</span>
                                    </div>
                                )}
                                {user.workplace && (
                                    <div className="profile-detail-item">
                                        <span className="profile-detail-label">Workplace:</span>
                                        <span className="profile-detail-value">{user.workplace}</span>
                                    </div>
                                )}
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
