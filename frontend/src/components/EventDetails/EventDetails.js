import React from 'react';
import './styles.scss';
import { formatEventDate } from '../../utils/dateTimeUtils';
import useDeviceType from '../../hooks/useDeviceType';

const EventDetails = ({ eventDetails }) => {
  /* 
  EventDetails Component
  
  This component renders detailed information about an event including date, location, 
  description, and categories. It adapts its display based on device type (mobile or desktop).
  
  Integration:
  This component is used in event detail pages or modals where comprehensive information 
  about a specific event needs to be displayed.
  
  Props:
  eventDetails - Object containing the following properties:
    - time: Date object or timestamp for the event
    - location: String representing the event location
    - description: String containing the detailed event description (rich text)
    - categories: Array of category objects with a 'name' property
  */
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
        <div 
            className="event-details-body"
            dangerouslySetInnerHTML={{ __html: eventDetails.description }}
        />
        <div className="event-details-footer">
            {/* TODO: will be actually added later */}
            {eventDetails.categories.map((category) => <p>{category.name}</p>)}
        </div>
    </div>
  );
};

export default EventDetails;