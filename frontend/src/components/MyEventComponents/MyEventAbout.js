import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EventDetails from "../EventDetails/EventDetails";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import AlertModal from "../AlertModal/AlertModal";
import eventservice from "../../services/eventservice";
import { useToast } from '../../contexts/ToastContext';
import { fetchFeed } from '../../redux/actions/feedActions';
import { fetchChats } from '../../redux/actions/chatActions';
import { leaveEventSuccess } from '../../redux/actions/eventActions';

const MyEventAbout = ({eventDetails}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (eventDetails?.id) {
            // Preload feed and chats data asynchronously
            const preloadData = async () => {
                try {
                    // We use Promise.all to load both in parallel
                    await Promise.all([
                        dispatch(fetchFeed(eventDetails.id)),
                        dispatch(fetchChats(eventDetails.id))
                    ]);
                } catch (error) {
                    console.error('Error preloading data:', error);
                }
            };
            
            // Use requestIdleCallback if available, otherwise setTimeout
            if (window.requestIdleCallback) {
                window.requestIdleCallback(() => preloadData());
            } else {
                setTimeout(preloadData, 100);
            }
        }
    }, [eventDetails?.id, dispatch]);

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

    const handleLeaveEvent = async () => {
        try {
            await eventservice.leaveEvent(eventDetails.id);
            dispatch(leaveEventSuccess(eventDetails.id));
            showToast('Successfully left the event!', 'success');
            navigate('/');
        } catch (error) {
            showToast('Failed to leave event', 'error');
            console.error('Error leaving event:', error);
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
                {eventDetails.is_creator ? (
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
                ) : (
                    <div className="event-delete-section">
                        <h2 className="event-delete-title">Leave Event</h2>
                        <p className="event-delete-warning">You will lose all your event data including your goal and messages.</p>
                        <div className="event-delete-buttons">
                            <ButtonComponent 
                                text="Leave Event" 
                                onClick={() => setShowLeaveModal(true)} 
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

            {showLeaveModal && (
                <AlertModal
                    title="Leave Event"
                    message="Are you sure you want to leave this event? You will lose all your event data including your goal and messages."
                    onContinue={handleLeaveEvent}
                    onCancel={() => setShowLeaveModal(false)}
                    continueText="Yes, Leave Event"
                    cancelText="Cancel"
                />
            )}
        </div>
    );
};

export default MyEventAbout;