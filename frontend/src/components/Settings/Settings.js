import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField/InputField';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import AlertModal from '../AlertModal/AlertModal';
import userService from '../../services/userservice';
import './styles.scss';

const Settings = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("New passwords don't match!");
            return;
        }
        setShowPasswordModal(true);
    };

    const handlePasswordConfirm = async () => {
        try {
            await userService.changePassword(currentPassword, newPassword);
            setShowPasswordModal(false);
            // Reset form
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            alert('Password updated successfully!');
        } catch (error) {
            alert(`Error updating password: ${error}`);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await userService.deleteAccount();
            window.location.reload();
        } catch (error) {
            alert(`Error deleting account: ${error}`);
        }
    };

    return (
        <div className="settings-container">
            <div className='settings-header'>
                <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
                <h1>Settings</h1>
            </div>
            <h2 className='settings-update'>Update Password</h2>
            <InputField 
                label="Current Password" 
                type="password" 
                placeholder='Enter your current password' 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
            />
            <InputField 
                label="New Password" 
                type="password" 
                placeholder='Enter your new password' 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
            />
            <InputField 
                label="Confirm New Password" 
                type="password" 
                placeholder='Confirm your new password' 
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)} 
            />
            <ButtonComponent text="Update Password" onClick={handleChangePassword} width='200px' />
            
            <h2 className='settings-delete'>Delete Account</h2>
            <p className="settings-label">This action cannot be undone.</p>
            <ButtonComponent text="Delete Account" onClick={handleDeleteAccount} width='200px' isDangerous={true} />

            {showPasswordModal && (
                <AlertModal
                    title="Confirm Password Change"
                    message="Are you sure you want to change your password?"
                    onContinue={handlePasswordConfirm}
                    onCancel={() => setShowPasswordModal(false)}
                    continueText="Change Password"
                    cancelText="Cancel"
                />
            )}

            {showDeleteModal && (
                <AlertModal
                    title="Delete Account"
                    message="Are you sure you want to delete your account? This action cannot be undone."
                    onContinue={handleDeleteConfirm}
                    onCancel={() => setShowDeleteModal(false)}
                    continueText="Delete Account"
                    cancelText="Cancel"
                />
            )}
        </div>
    );
};

export default Settings;
