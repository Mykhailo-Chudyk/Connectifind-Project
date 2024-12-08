import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const MyEventPerson = ({ eventDetails }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

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
                <div className="person-container">
                    <div className="person-header">
                        <div className="person-header-left">
                            <div className="person-header-left-arrow">  
                                <span className='back-arrow' onClick={() => navigate('/event/' + eventDetails?.id + '/people')}>←</span>
                                <h1>{user.first_name} {user.last_name}</h1>
                            </div>
                            {user.goal && <h3>Goal: {user.goal}</h3>}
                            <div className="person-description">
                                {user.description && <p>{user.description}</p>} 
                            </div>
                            <div className="person-actions">    
                                <ButtonComponent text="Message" level="secondary" onClick={() => navigate('/event/' + eventDetails?.id + '/chats/' + user.id)} width="150px" />
                            </div>
                        </div>
                        <div className="person-header-right">
                            <div className="person-header-avatar">
                                {user.user?.avatar ? <img src={user.user?.avatar} alt="Default profile avatar" /> : <FontAwesomeIcon icon={faUserCircle} />}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Participant not found.</p>
            )}
        </>
    );
};

export default MyEventPerson;
