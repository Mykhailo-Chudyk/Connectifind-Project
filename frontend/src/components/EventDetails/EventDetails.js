import React from 'react';
import './styles.scss';

const EventDetails = ({ eventDetails }) => {
  return (
    <div className="event-details-container">
        <div className="event-details-header">
            <div className="event-details-date">
                <p>{new Date(eventDetails.time).toLocaleString()}</p>
            </div>
            <div className="event-details-location">
                <p>{eventDetails.location}</p>
            </div>
        </div>
        <div className="event-details-body">
            <p>{eventDetails.description}</p>
        </div>
        <div className="event-details-footer">
            {/* TODO: will be actually added later */}
            {eventDetails.categories.map((category) => <p>{category.name}</p>)}
        </div>
    </div>
  );
};

export default EventDetails;