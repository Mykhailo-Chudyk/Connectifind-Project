import React from 'react';
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import InputField from '../InputField/InputField.js';

const Settings = () => {

    // TODO: Add password update functionality

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <p>Update your password</p>
            <InputField label="Current Password" type="password" placeholder='Enter your current password'/>
            <InputField label="New Password" type="password" placeholder='Enter your new password'/>
            <InputField label="Confirm New Password" type="password" placeholder='Confirm your new password'/>
            <ButtonComponent text="Update Password" onClick={() => {}} width='200px'/>
            <h1>Delete Account  </h1>
            <p>This action cannot be undone.</p>
            <ButtonComponent text="Delete Account" onClick={() => {}} width='200px' isDangerous={true}/>
        </div>
    );
};

export default Settings;
