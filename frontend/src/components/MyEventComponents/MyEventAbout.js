import React from "react";


const MyEventAbout = ({ eventDetails }) => {

    if (!eventDetails) {
        return null;
    }

    return (
        <>
          <h2>{eventDetails.title}</h2>
          <p>{eventDetails.description}</p>
          <p>Location: {eventDetails.location}</p>
          <p>Time: {new Date(eventDetails.time).toLocaleString()}</p>
          <p>Capacity: {eventDetails.capacity || 'Not specified'}</p>
          <p>Author: {eventDetails.author.first_name + " " + eventDetails.author.last_name}</p>
          <p>Visibility: {eventDetails.visibility}</p>
          <p>Number of participants: {eventDetails.participant_count}</p>
          <h3>Participants:</h3>
          {eventDetails.participants.map((participant) => <p>{participant.first_name} {participant.last_name}</p>)}
        </>
    );
};

export default MyEventAbout;