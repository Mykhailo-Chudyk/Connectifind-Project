import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import InputField from "../InputField/InputField";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import eventservice from '../../services/eventservice'; 

const MyEventMe = ({ eventDetails }) => {
    const userId = useSelector((state) => state.user?.user?.id);
    const [userGoal, setUserGoal] = useState('');
    const [isSaving, setIsSaving] = useState(false); 

    useEffect(() => {
        if (eventDetails && eventDetails.participant_details) {
            setUserGoal(eventDetails.participant_details.goal || '');
        }
    }, [eventDetails, userId]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await eventservice.updateGoal(eventDetails.id, userGoal);
            window.location.reload();
        } catch (error) {
            console.error('Error updating goal:', error);
            alert('Failed to update goal.');
        } finally {
            setIsSaving(false);
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
                <ButtonComponent text="Cancel" onClick={() => {window.history.back()}} level="primary" width="200px"/>
                <ButtonComponent text={isSaving ? "Saving..." : "Save"} onClick={handleSave} width="200px" disabled={isSaving}/>
            </div>
        </div>
    );
};

export default MyEventMe;