import React, { useState } from 'react';
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import InputField from '../InputField/InputField.js';
import userService from '../../services/userservice';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            return;
        }
        try {
            await userService.changePassword(currentPassword, newPassword);
        } catch (error) {
            alert(`Error updating password: ${error}`);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await userService.deleteAccount();
                window.location.reload();
            } catch (error) {
                alert(`Error deleting account: ${error}`);
            }
        }
    };

    return (
        <div className="settings-container">
            <div className='settings-header'>
                <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
                <h1>Settings</h1>
            </div>
            {/* <p className="settings-label">Update your password</p> */}
            <h2 className='settings-update'>Update Password</h2>
            <InputField label="Current Password" type="password" placeholder='Enter your current password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <InputField label="New Password" type="password" placeholder='Enter your new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <InputField label="Confirm New Password" type="password" placeholder='Confirm your new password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            <ButtonComponent text="Update Password" onClick={handleChangePassword} width='200px' />
            <h2 className='settings-delete'>Delete Account</h2>
            <p className="settings-label">This action cannot be undone.</p>
            <ButtonComponent text="Delete Account" onClick={handleDeleteAccount} width='200px' isDangerous={true} />
        </div>
    );
};

export default Settings;
