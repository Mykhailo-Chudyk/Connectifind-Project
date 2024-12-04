import React, { useState } from 'react';
import eventservice from '../services/eventservice.js';
import { useNavigate } from 'react-router-dom';

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
        const { name, value, type, files } = e.target;
        setEventData({
            ...eventData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in eventData) {
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
        <form onSubmit={handleSubmit}>
            <h1>Create Event</h1>
            <input type="file" name="image" onChange={handleChange} />
            <input type="text" name="title" value={eventData.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
            <input type="text" name="location" value={eventData.location} onChange={handleChange} placeholder="Location" required />
            <input type="datetime-local" name="time" value={eventData.time} onChange={handleChange} required />
            <input type="number" name="capacity" value={eventData.capacity} onChange={handleChange} placeholder="Capacity" />
            <select name="visibility" value={eventData.visibility} onChange={handleChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <select name="categories" multiple value={eventData.categories} onChange={handleChange}>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <input type="number" name="duration" value={eventData.duration} onChange={handleChange} placeholder="Duration (minutes)" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddEvent;
