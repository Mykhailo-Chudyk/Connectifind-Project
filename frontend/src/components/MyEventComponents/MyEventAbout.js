import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EventDetails from "../EventDetails/EventDetails";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import AlertModal from "../AlertModal/AlertModal";
import eventservice from "../../services/eventservice";
import { useToast } from '../../contexts/ToastContext';

const MyEventAbout = ({eventDetails}) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { showToast } = useToast();

    if (!eventDetails) {
        return null;
    }

    const handleDeleteEvent = async () => {
        try {
            await eventservice.deleteEvent(eventDetails.id);
            showToast('Event deleted successfully!', 'success');
            navigate('/');
        } catch (error) {
            showToast('Failed to delete event', 'error');
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="event-container">
            <h1>{eventDetails.title}</h1>
            <p className="event-details-title">Event Details</p>
            <EventDetails eventDetails={eventDetails}/>
            {/* <p className="event-details-spots">Spots left: {eventDetails.capacity - eventDetails.participant_count}</p>
            <div className="event-details-buttons">
                <ButtonComponent text={"Return"} onClick={() => window.history.back()} width='200px' level='primary'/>
                {!eventDetails.is_creator && <ButtonComponent text={isParticipant? "Leave" : "Join"} onClick={joinLeaveEvent} width='200px' />}
                {(eventDetails.is_creator && !isParticipant) && <ButtonComponent text={"Go to Event"} onClick={goToEvent} width='200px'/>}
            </div> */}
            <div className="event-details-footer">
                {eventDetails.is_creator && (
                    <div className="event-delete-section">
                        <h2 className="event-delete-title">Delete Event</h2>
                        <p className="event-delete-warning">This action cannot be undone.</p>
                        <div className="event-delete-buttons">
                            <ButtonComponent 
                                text="Delete Event" 
                                onClick={() => setShowDeleteModal(true)} 
                            width='200px' 
                            isDangerous={true}
                        />
                        </div>
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <AlertModal
                    title="Delete Event"
                    message="Are you sure you want to delete this event? This action cannot be undone and all participants will lose access to the event."
                    onContinue={handleDeleteEvent}
                    onCancel={() => setShowDeleteModal(false)}
                    continueText="Delete Event"
                    cancelText="Cancel"
                />
            )}
        </div>
    );
};

export default MyEventAbout;