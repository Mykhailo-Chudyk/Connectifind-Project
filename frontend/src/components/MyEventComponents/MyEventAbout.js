import React from "react";
import EventDetails from "../EventDetails/EventDetails";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const MyEventAbout = ({eventDetails}) => {

    if (!eventDetails) {
        return null;
    }

    return (
        <div className="event-container">
            <h1>{eventDetails.title}</h1>
            <p className="event-details-title">Event Details</p>
            <EventDetails eventDetails={eventDetails}/>
            <div className="event-details-footer">
            {/* <p className="event-details-spots">Spots left: {eventDetails.capacity - eventDetails.participant_count}</p>
            <div className="event-details-buttons">
                <ButtonComponent text={"Return"} onClick={() => window.history.back()} width='200px' level='primary'/>
                {!eventDetails.is_creator && <ButtonComponent text={isParticipant? "Leave" : "Join"} onClick={joinLeaveEvent} width='200px' />}
                {(eventDetails.is_creator && !isParticipant) && <ButtonComponent text={"Go to Event"} onClick={goToEvent} width='200px'/>}
            </div> */}
            </div>
        </div>
    );
};

export default MyEventAbout;