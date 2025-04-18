import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import InputField from '../InputField/InputField';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import AlertModal from '../AlertModal/AlertModal';
import userService from '../../services/userservice';
import { fetchUser } from '../../redux/actions/userActions';
import { useToast } from '../../contexts/ToastContext';
import './styles.scss';
import useDeviceType from '../../hooks/useDeviceType';

const DefaultProfile = () => {
    /* 
    DefaultProfile component provides a user interface for viewing and editing profile information.
    It allows users to modify their first name, last name, description, and avatar image.
    
    This component is integrated into the main application as a profile management page, 
    accessible through the user settings or account area. It leverages Redux for state management,
    fetching the current user data from the store and dispatching updates when changes are saved.
    
    The component handles image upload, form field validation, and provides feedback through
    toast notifications when actions are completed. It also confirms with users before
    discarding unsaved changes.
    
    No props are required as it gets all necessary data from the Redux store.
    */
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userUniversity, setUserUniversity] = useState('');
    const [userHometown, setUserHometown] = useState('');
    const [userWorkplace, setUserWorkplace] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [initialState, setInitialState] = useState({});
    const fileInputRef = useRef(null);
    const { isMobile } = useDeviceType();

    useEffect(() => {
        if (user.user) {
            const initial = {
                firstName: user.user.first_name || '',
                lastName: user.user.last_name || '',
                description: user.user.description || '',
                avatar: user.user.avatar || '',
                university: user.user.university || '',
                hometown: user.user.hometown || '',
                workplace: user.user.workplace || ''
            };
            setInitialState(initial);
            setUserFirstName(initial.firstName);
            setUserLastName(initial.lastName);
            setUserDescription(initial.description);
            setUserAvatar(initial.avatar);
            setUserUniversity(initial.university);
            setUserHometown(initial.hometown);
            setUserWorkplace(initial.workplace);
        }
    }, [user]);

    const hasChanges = () => {
        return userFirstName !== initialState.firstName ||
            userLastName !== initialState.lastName ||
            userDescription !== initialState.description ||
            userAvatar !== initialState.avatar ||
            userUniversity !== initialState.university ||
            userHometown !== initialState.hometown ||
            userWorkplace !== initialState.workplace;
    };

    const handleCancel = () => {
        if (hasChanges()) {
            setShowCancelModal(true);
        } else {
            navigate(-1);
        }
    };

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
                university: userUniversity,
                hometown: userHometown,
                workplace: userWorkplace
            };
            await userService.updateUserProfile(profileData);
            showToast('Profile updated successfully', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            showToast('Failed to update profile', 'error');
        } finally {
            setIsLoading(false);
            dispatch(fetchUser());
        }
    };

    return (
        <div className={`default-profile-container ${isMobile ? 'mobile' : ''}`}>
            <div className='default-profile-header'>
                <span className='back-arrow' onClick={handleCancel}>←</span>
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
                    <InputField label="First Name" value={userFirstName} required={true} placeholder="Enter your first name" onChange={(e) => setUserFirstName(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Last Name" value={userLastName} required={true} placeholder="Enter your last name" onChange={(e) => setUserLastName(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Email" value={user.user?.email} onChange={() => {}} disabled={true} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Description" value={userDescription} placeholder="Enter your description" onChange={(e) => setUserDescription(e.target.value)} multiline={true} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="University" value={userUniversity} placeholder="Minerva University" onChange={(e) => setUserUniversity(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Hometown" value={userHometown} placeholder="New York, NY" onChange={(e) => setUserHometown(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-name">
                <div className="default-profile-name-input">
                    <InputField label="Workplace" value={userWorkplace} placeholder="Meta, Inc." onChange={(e) => setUserWorkplace(e.target.value)} />
                </div>
            </div>
            <div className="default-profile-buttons">
                <ButtonComponent text="Cancel" onClick={handleCancel} level="primary" width={isMobile ? '150px' : '200px'}/>
                <ButtonComponent 
                    text={"Save"} 
                    onClick={handleSave} 
                    width={isMobile ? '150px' : '200px'}
                    disabled={isLoading || !hasChanges()}
                />
            </div>

            {showCancelModal && (
                <AlertModal
                    title="Cancel Changes"
                    message="Are you sure you want to cancel? All your changes will be lost."
                    onContinue={() => {
                        setShowCancelModal(false);
                        dispatch(fetchUser());
                    }}
                    onCancel={() => setShowCancelModal(false)}
                    continueText="Yes, Cancel"
                    cancelText="Continue Editing"
                />
            )}
        </div>
    );
};

export default DefaultProfile;
