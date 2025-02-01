import React, { useState } from 'react';
import eventservice from '../../services/eventservice.js';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import InputField from '../InputField/InputField';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import AlertModal from '../AlertModal/AlertModal';
import { useToast } from '../../contexts/ToastContext';
import useDeviceType from '../../hooks/useDeviceType';
const AddEvent = () => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        location: '',
        time: '',
        capacity: '',
        visibility: 'public',
        image: null,
        categories: [],
        duration: 120,
    });

    const categories = [
        'Business', 'Education', 'Health', 'Music', 'Sports', 'Arts', 'Food',
        'Technology', 'Charity', 'Travel', 'Community', 'Career', 'Personal',
        'Film', 'Environment', 'Gaming', 'Fashion', 'History', 'Science', 'Language'
    ];

    const navigate = useNavigate();
    const { showToast } = useToast();
    const { isMobile } = useDeviceType();
    const handleChange = (e) => {
        const { name, value, type, files, options } = e.target;
        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEventData({
                    ...eventData,
                    [name]: reader.result 
                });
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        } else if (name === 'categories') {
            const selectedCategories = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            setEventData({
                ...eventData,
                [name]: selectedCategories
            });
        } else {
            setEventData({
                ...eventData,
                [name]: value
            });
        }
    };

    const handleCancel = () => {
        const hasChanges = Object.values(eventData).some(value => 
            value && value.length > 0 && value !== 'public' && !Array.isArray(value)
        );

        if (hasChanges) {
            setShowCancelModal(true);
        } else {
            navigate(-1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in eventData) {
            if (key === 'image' && eventData[key] === null) {
                continue;
            }
            formData.append(key, eventData[key]);
        }
        try {
            await eventservice.addEvent(formData);
            showToast('Event created successfully!', 'success');
            navigate('/');
        } catch (error) {
            showToast('Failed to create event', 'error');
            console.error('Failed to create event:', error);
        }
    };

    const hasChanges = () => {
        return eventData.title !== '' && eventData.description !== '' && eventData.location !== '' && eventData.time !== ''&& eventData.capacity !== '';
    };

    return (
        <div className={`add-event-container ${isMobile ? 'mobile' : ''}`}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='add-event-header'>
                    <span className='back-arrow' onClick={handleCancel}>←</span>
                    <h1>Create Event</h1>
                </div>

                <span className="add-event-label">Image</span>
                <input type="file" name="image" onChange={handleChange} />
                
                <InputField 
                    label="Name" 
                    type="text" 
                    name="title" 
                    value={eventData.title} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required={true}
                />
                
                <InputField 
                    label="Description" 
                    type="text" 
                    name="description" 
                    value={eventData.description} 
                    onChange={handleChange} 
                    placeholder="Description" 
                    multiline={true}
                    required={true}
                />
                
                <InputField 
                    label="Location" 
                    type="text" 
                    name="location" 
                    value={eventData.location} 
                    onChange={handleChange} 
                    placeholder="Location" 
                    required={true}
                />
                
                <InputField 
                    label="Time" 
                    type="datetime-local" 
                    name="time" 
                    value={eventData.time} 
                    onChange={handleChange} 
                    required={true}
                />

                <InputField 
                    label="Duration (minutes)" 
                    type="number" 
                    name="duration" 
                    value={eventData.duration} 
                    onChange={handleChange} 
                    placeholder="Duration" 
                    required={true}
                />
                
                <InputField 
                    label="Capacity" 
                    type="number" 
                    name="capacity" 
                    value={eventData.capacity} 
                    onChange={handleChange} 
                    placeholder="Capacity" 
                    required={true}
                />

                <InputField 
                    label="Visibility" 
                    name="visibility" 
                    value={eventData.visibility} 
                    onChange={handleChange} 
                    options={[
                        { value: 'public', label: 'Public' },
                        { value: 'private', label: 'Private' }
                    ]}
                    required={true}
                />
                    
                {/* TODO: Add categories */}
                {/* <select name="categories" multiple value={eventData.categories} onChange={handleChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select> */}

                
                <div className="add-event-buttons">
                    <ButtonComponent
                        text="Cancel"
                        onClick={handleCancel}
                        level='primary'
                        width={isMobile ? '150px' : '250px'}
                    />
                    <ButtonComponent
                        disabled={!hasChanges()}
                        text="Create Event"
                        onClick={handleSubmit}
                        width={isMobile ? '150px' : '250px'}
                    />
                </div>
            </form>

            {showCancelModal && (
                <AlertModal
                    title="Cancel Event Creation"
                    message="Are you sure you want to cancel? All your progress will be lost."
                    onContinue={() => {
                        setShowCancelModal(false);
                        navigate(-1);
                    }}
                    onCancel={() => setShowCancelModal(false)}
                    continueText="Yes, Cancel"
                    cancelText="Continue Editing"
                />
            )}
        </div>
    );
};

export default AddEvent;
