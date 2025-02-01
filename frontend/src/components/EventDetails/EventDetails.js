import React from 'react';
import './styles.scss';
import { formatEventDate } from '../../utils/dateTimeUtils';
import useDeviceType from '../../hooks/useDeviceType';

const EventDetails = ({ eventDetails }) => {
  const {isMobile} = useDeviceType();
  return (
    <div className={`event-details-container ${isMobile ? 'mobile' : ''}`}>
        <div className="event-details-header">
            <div className="event-details-date">
                <p>{formatEventDate(eventDetails.time)}</p>
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