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
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventservice.addEvent(eventData);
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
            <input type="text" name="title" value={eventData.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
            <input type="text" name="location" value={eventData.location} onChange={handleChange} placeholder="Location" required />
            <input type="datetime-local" name="time" value={eventData.time} onChange={handleChange} required />
            <input type="number" name="capacity" value={eventData.capacity} onChange={handleChange} placeholder="Capacity" />
            <select name="visibility" value={eventData.visibility} onChange={handleChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddEvent;
