import React, { useEffect, useRef } from 'react';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { faUserCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import InputField from '../InputField/InputField.js';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import userService from '../../services/userservice';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/actions/userActions';

const DefaultProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user.user) {
            setUserFirstName(user.user.first_name || '');
            setUserLastName(user.user.last_name || '');
            setUserDescription(user.user.description || '');
            setUserAvatar(user.user.avatar || '');
        }
    }, [user]);

    const handleRemoveAvatar = (e) => {
        e.stopPropagation();
        setUserAvatar('');
    };

    const handleAvatarClick = () => {
        if (!userAvatar) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const profileData = {
                firstName: userFirstName,
                lastName: userLastName,
                description: userDescription,
                avatar: userAvatar,
            };
            await userService.updateUserProfile(profileData);
            // Refresh user data after update
            dispatch(fetchUser());
            navigate(-1);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="default-profile-container">
            <div className='default-profile-header'>
                <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
                <h1>Your Profile</h1>
            </div>
            <p className="default-profile-label">Modify your profile information</p>
            <div className="default-profile-avatar" onClick={handleAvatarClick}>
                <div className="avatar-overlay">
                    {userAvatar ? (
                        <img src={userAvatar} alt="Profile avatar" />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} />
                    )}
                    <div className="avatar-upload-overlay">
                        {userAvatar ? (
                            <FontAwesomeIcon icon={faTrash} onClick={handleRemoveAvatar} />
                        ) : (
                            <FontAwesomeIcon icon={faPlus} />
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="First Name" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-name">
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
                <ButtonComponent text="Save" onClick={handleSave} width="200px"/>
            </div>
        </div>
    );
};

export default DefaultProfile;
