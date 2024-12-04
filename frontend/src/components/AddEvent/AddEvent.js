import React, { useState } from 'react';
import eventservice from '../../services/eventservice.js';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import InputField from '../InputField/InputField';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';

const AddEvent = () => {
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

    const handleChange = (e) => {
        const { name, value, type, files, options } = e.target;
        if (type === 'file') {
            setEventData({
                ...eventData,
                [name]: files[0]
            });
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
            alert('Event created successfully!');
            navigate('/events');
        } catch (error) {
            console.error('Failed to create event:', error);
            alert('Failed to create event.');
        }
    };

    return (
        <div className='add-event-container'>
            <form onSubmit={handleSubmit}>
                <h1>Create a new event</h1>

                <span className="add-event-label">Image</span>
                <input type="file" name="image" onChange={handleChange} />
                
                <InputField 
                    label="Name" 
                    type="text" 
                    name="title" 
                    value={eventData.title} 
                    onChange={handleChange} 
                    placeholder="Name" 
                />
                
                <InputField 
                    label="Description" 
                    type="text" 
                    name="description" 
                    value={eventData.description} 
                    onChange={handleChange} 
                    placeholder="Description" 
                />
                
                <InputField 
                    label="Location" 
                    type="text" 
                    name="location" 
                    value={eventData.location} 
                    onChange={handleChange} 
                    placeholder="Location" 
                />
                
                <InputField 
                    label="Time" 
                    type="datetime-local" 
                    name="time" 
                    value={eventData.time} 
                    onChange={handleChange} 
                />

                <InputField 
                    label="Duration (minutes)" 
                    type="number" 
                    name="duration" 
                    value={eventData.duration} 
                    onChange={handleChange} 
                    placeholder="Duration" 
                />
                
                <InputField 
                    label="Capacity" 
                    type="number" 
                    name="capacity" 
                    value={eventData.capacity} 
                    onChange={handleChange} 
                    placeholder="Capacity" 
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
                />
                    
                <select name="categories" multiple value={eventData.categories} onChange={handleChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                
                
                <div className="add-event-buttons">
                    <ButtonComponent
                        text="Cancel"
                        onClick={() => navigate('/events')}
                        level='primary'
                        width='300px'
                    />
                    <ButtonComponent
                        text="Create Event"
                        onClick={handleSubmit}
                        width='300px'
                    />
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
