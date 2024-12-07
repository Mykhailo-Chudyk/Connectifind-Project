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
                            <h1>{user.first_name} {user.last_name}</h1>
                            <h3>Goal: {user.goal}</h3>
                        </div>
                        <div className="person-header-right">
                            <div className="person-header-avatar">
                                {user.user?.avatar ? <img src={user.user?.avatar} alt="Default profile avatar" /> : <FontAwesomeIcon icon={faUserCircle} />}
                            </div>
                        </div>
                    </div>
                    <div className="person-description">
                        <p>{user.description}</p>
                    </div>
                    <div className="person-actions">
                        <ButtonComponent text="Return" level="primary" onClick={() => navigate('/event/' + eventDetails?.id + '/people')} width="150px" />
                        <ButtonComponent text="Message" level="secondary" onClick={() => navigate('/event/' + eventDetails?.id + '/chats/' + user.id)} width="150px" />
                    </div>
                </div>
            ) : (
                <p>Participant not found.</p>
            )}
        </>
    );
};

export default MyEventPerson;
