import React, { useState, useEffect } from 'react';
import eventservice from '../../services/eventservice.js'; 

const MyEventChats = ({ eventDetails }) => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            const data = await eventservice.listAllChats(eventDetails?.id);
            setChats(data);
        } catch (err) {
            console.error('Error fetching chat messages:', err);
        }
    };

    useEffect(() => {
        if (eventDetails)
            fetchChats();
    }, [eventDetails]);

    return (
        <>
            <h1>All chats</h1>
            {chats.map((chat, index) => (
                <div key={index}>
                    <p>{chat.id}</p>
                    <p>From: {chat.first_name} {chat.last_name}</p>
                </div>
            ))}
        </>
    );
};

export default MyEventChats;
