import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import InputField from "../InputField/InputField";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import AlertModal from "../AlertModal/AlertModal";
import eventservice from '../../services/eventservice'; 
import './styles.scss';

const MyEventMe = ({ eventDetails }) => {
    const userId = useSelector((state) => state.user?.user?.id);
    const [userGoal, setUserGoal] = useState('');
    const [initialGoal, setInitialGoal] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    useEffect(() => {
        if (eventDetails && eventDetails.participant_details) {
            const currentGoal = eventDetails.participant_details.goal || '';
            setUserGoal(currentGoal);
            setInitialGoal(currentGoal);
        }
    }, [eventDetails, userId]);

    const hasChanges = () => {
        return userGoal !== initialGoal;
    };

    const handleSave = async () => {
        try {
            await eventservice.updateGoal(eventDetails.id, userGoal);
            window.location.reload();
        } catch (error) {
            console.error('Error updating goal:', error);
            alert('Failed to update goal.');
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
        <div className="default-profile-container">
            <h1>Your Profile</h1>
            <p className="default-profile-label">Goal will be displayed to other participants</p>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Goal" value={userGoal} onChange={(e) => setUserGoal(e.target.value)} multiline={true} />
                </div>
            </div>
            <div className="default-profile-buttons">
                <ButtonComponent text="Cancel" onClick={handleCancel} level="primary" width="200px"/>
                <ButtonComponent text="Save" onClick={handleSave} width="200px" disabled={!hasChanges()}/>
            </div>

            {showCancelModal && (
                <AlertModal
                    title="Cancel Changes"
                    message="Are you sure you want to cancel? Your goal changes will be lost."
                    onContinue={() => {
                        setShowCancelModal(false);
                        window.history.back();
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