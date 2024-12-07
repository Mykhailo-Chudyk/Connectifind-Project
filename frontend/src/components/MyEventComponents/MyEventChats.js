import React, { useState, useEffect } from 'react';
import eventservice from '../../services/eventservice.js'; 
import { FaUserCircle } from 'react-icons/fa';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const MyEventChats = ({ eventDetails }) => {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

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
        <div className='chats-container'>
            <h1>Chats</h1>
            {chats.map((chat, index) => (
                <div key={chat?.id} className='single-chat-container'>
                    <div className="chat-avatar">
                        {chat.avatar && <img src={chat.avatar} alt="avatar" />}
                        {!chat.avatar && <FaUserCircle />}
                    </div>
                    <div className="chat-details">
                        <p className='chat-name'>{chat.first_name} {chat.last_name}</p>
                        {/* TODO: Add last message */}
                        <p className='chat-last-message'></p>
                        {/* TODO: Add time of last message */}
                        {/* <p className="chat-time"></p> */}
                    </div>
                    <div className="chat-button">
                        <ButtonComponent text="Chat" onClick={() => navigate(`/event/${eventDetails?.id}/chats/${chat?.id}`)}></ButtonComponent>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyEventChats;
