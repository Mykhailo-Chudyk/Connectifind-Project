import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import InputField from "../InputField/InputField";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import AlertModal from "../AlertModal/AlertModal";
import eventservice from '../../services/eventservice'; 
import './styles.scss';
import { useToast } from '../../contexts/ToastContext';
import { updateEventGoal, fetchUserEvents } from '../../redux/actions/eventActions';
import useDeviceType from '../../hooks/useDeviceType';

const MyEventMe = ({ eventDetails }) => {
    /* 
    This component displays and allows editing of a user's goal for a specific event.
    It is integrated into the user's personal event view, showing their profile information 
    for events they're participating in.

    The component includes:
    - A text input field for editing the user's goal
    - Save and Cancel buttons for managing changes
    - Confirmation modal when canceling with unsaved changes

    Props:
    eventDetails - Object containing information about the event, including:
    - id: The event ID
    - participant_details: Object containing user-specific data for this event
        - goal: The current goal set by the user for this event
    */
    const userId = useSelector((state) => state.user?.user?.id);
    const [userGoal, setUserGoal] = useState('');
    const [initialGoal, setInitialGoal] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const { showToast } = useToast();
    const dispatch = useDispatch();
    const { isMobile } = useDeviceType();
    
    useEffect(() => {
        if (eventDetails && eventDetails.participant_details) {
            const currentGoal = eventDetails.participant_details.goal || '';
            setUserGoal(currentGoal);
            setInitialGoal(currentGoal);
        }
    }, [eventDetails?.participant_details?.goal]);

    const hasChanges = () => {
        return userGoal !== initialGoal;
    };

    const handleSave = async () => {
        try {
            await eventservice.updateGoal(eventDetails.id, userGoal);
            dispatch(updateEventGoal(eventDetails.id, userGoal));
            setInitialGoal(userGoal);
            dispatch(fetchUserEvents());
            showToast('Goal updated successfully', 'success');
        } catch (error) {
            showToast('Failed to update goal.', 'error');    
        } 
    };

    const handleCancel = () => {
        if (hasChanges()) {
            setShowCancelModal(true);
        } else {
            window.history.back();
        }
    };

    return (
        <div className={`default-profile-container ${isMobile ? 'mobile' : ''}`}>
            <h1 className="default-profile-title">Your Profile</h1>
            <p className="default-profile-label">Goal will be displayed to other participants</p>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Goal" value={userGoal} placeholder="Enter your goal for this event" onChange={(e) => setUserGoal(e.target.value)} multiline={true} />
                </div>
            </div>
            <div className="default-profile-buttons">
                <ButtonComponent text="Cancel" onClick={handleCancel} level="primary" width={isMobile ? '150px' : '200px'}/>
                <ButtonComponent text="Save" onClick={handleSave} width={isMobile ? '150px' : '200px'} disabled={!hasChanges()}/>
            </div>

            {showCancelModal && (
                <AlertModal
                    title="Cancel Changes"
                    message="Are you sure you want to cancel? Your goal changes will be lost."
                    onContinue={() => {
                        setShowCancelModal(false);
                        setUserGoal(initialGoal);
                    }}
                    onCancel={() => setShowCancelModal(false)}
                    continueText="Yes, Cancel"
                    cancelText="Continue Editing"
                />
            )}
        </div>
    );
};

export default MyEventMe;