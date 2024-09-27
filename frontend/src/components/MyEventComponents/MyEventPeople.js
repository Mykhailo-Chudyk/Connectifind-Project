import React from "react";


const MyEventPeople = ({ eventDetails }) => {



    return (
        <>
            <h3>Participants:</h3>
            {eventDetails?.participants.map((participant) => <p>{participant.first_name} {participant.last_name}</p>)}
        </>
    );
};

export default MyEventPeople;