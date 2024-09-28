import React from "react";
import {useNavigate} from 'react-router-dom';


const MyEventPeople = ({ eventDetails }) => {
    const navigate = useNavigate();



    return (
        <>
            <h3>Participants:</h3>
            {eventDetails?.participants.map((participant) => 
            <div onClick={() => navigate('/event/' + eventDetails.id + '/people/' + participant.id)}>
                {participant.first_name} {participant.last_name}
            </div>)}
        </>
    );
};

export default MyEventPeople;