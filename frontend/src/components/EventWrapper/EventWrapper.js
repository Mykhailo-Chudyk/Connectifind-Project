import React from "react";
import './styles.scss';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { formatEventDateTime, calculateTimeUntilEvent } from "../../utils/dateTimeUtils";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const EventWrapper = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div className='event-wrapper'>
        <div className="event-icon">
            {event.image && <img src={event.image} alt="event icon" />}
            {!event.image && <FaCalendarAlt />}
        </div>
        <div className="event-body">
            <p className="event-title">{event.title}</p>
            <p className="event-time">
                {formatEventDateTime(event.time, event.duration).formattedDate}
                <span className="event-time-divider"></span>
                {formatEventDateTime(event.time, event.duration).formattedTime}
            </p>
            <p className="event-location">{event.location}</p>
        </div>
        <div className="event-actions">
            <p className="event-actions-text">{calculateTimeUntilEvent(event.time, 120)}</p>
            <ButtonComponent text="Details" level="secondary" onClick={() => {navigate(`/events/${event.id}`)}} />
        </div>
    </div>
  );
};

export default EventWrapper; 