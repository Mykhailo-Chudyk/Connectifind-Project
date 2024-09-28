import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

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
                <>
                    <h3>Participant:</h3>
                    <p>{user.first_name} {user.last_name}</p>
                    <button onClick={() => navigate('/event/' + eventDetails?.id + '/chats/' + user.id)}>Write a message</button>
                </>
            ) : (
                <p>Participant not found.</p>
            )}
        </>
    );
};

export default MyEventPerson;
