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