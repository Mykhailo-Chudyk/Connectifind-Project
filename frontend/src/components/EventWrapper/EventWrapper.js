import React, { useState } from "react";
import './styles.scss';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { formatEventDateTime, calculateTimeUntilEvent } from "../../utils/dateTimeUtils";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import useDeviceType from '../../hooks/useDeviceType';

const EventWrapper = ({ event }) => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCodeVisibility = (e) => {
    e.stopPropagation();
    setIsCodeVisible(!isCodeVisible);
  };

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
            {event?.code && (
              <div className="event-code-container" onClick={toggleCodeVisibility}>
                <span className="event-code-label">Join code:</span>
                <p className={`event-code ${isCodeVisible ? 'visible' : ''}`}>
                  {isCodeVisible ? event.code : event.code.replace(/./g, '•')}
                </p>
              </div>
            )}
        </div>
        <div className="event-actions">
            {!isMobile ? <p className="event-actions-text">{calculateTimeUntilEvent(event.time, 120)}</p> : null}
            <ButtonComponent text="Details" level="secondary" onClick={() => {navigate(`/events/${event.id}`)}} />
        </div>
    </div>
  );
};

export default EventWrapper; 