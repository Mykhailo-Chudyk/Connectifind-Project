import React, { useEffect } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import InputField from '../InputField/InputField.js';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import userService from '../../services/userservice';


const DefaultProfile = () => {
    const user = useSelector(state => state.user);
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        if (user.user) {
            setUserFirstName(user.user.first_name || '');
            setUserLastName(user.user.last_name || '');
            setUserDescription(user.user.description || '');
            setUserAvatar(user.user.avatar || '');
        }
    }, [user]);

    const handleSave = async () => {
        try {
            const profileData = {
                firstName: userFirstName,
                lastName: userLastName,
                description: userDescription,
                avatar: userAvatar,
            };
            const response = await userService.updateUserProfile(profileData);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="default-profile-container">
            <h1>Your Profile</h1>
            <p className="default-profile-description">
                This is the default profile that will be displayed in all the events. Your goal joining for the event is customized and can be modified on the main page of the event. This can be also your organizational name if you are the onc who creates an event.
            </p>
            <div className="default-profile-avatar">
                {/* TODO: Add avatar upload && make sure that it's properly displayed */}
                {user.user?.avatar ? <img src={user.user?.avatar} alt="Default profile avatar" /> : <FontAwesomeIcon icon={faUserCircle} />}
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="First Name" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} />
                </div>
                <div className="default-profile-name-input">
                    <InputField label="Last Name" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Email" value={user.user?.email} onChange={() => {}} disabled={true} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Description" value={userDescription} onChange={(e) => setUserDescription(e.target.value)} multiline={true} />
                </div>
            </div>
            <div className="default-profile-buttons">
                <ButtonComponent text="Cancel" onClick={() => {window.history.back()}} level="primary" width="200px"/>
                <ButtonComponent text="Save" onClick={() => {handleSave()}} width="200px"/>
            </div>
        </div>
    );
};

export default DefaultProfile;
