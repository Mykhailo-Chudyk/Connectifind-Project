import React, { useState, useEffect } from 'react';
import eventservice from '../../services/eventservice.js'; 
import { FaUserCircle } from 'react-icons/fa';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import { useNavigate } from 'react-router-dom';
import { formatEventDate } from '../../utils/dateTimeUtils';
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
            <p className='chats-label'>Chat with other participants</p>
            {chats.map((chat, index) => (
                <div key={chat?.id} className='single-chat-container'>
                    <div className="chat-avatar">
                        {chat.avatar && <img src={chat.avatar} alt="avatar" />}
                        {!chat.avatar && <FaUserCircle />}
                    </div>
                    <div className="chat-details">
                        <p className='chat-name'>{chat.user.first_name} {chat.user.last_name}</p>
                        <p className='chat-last-message'>{chat.last_message_content}</p>
                        <p className="chat-time">{formatEventDate(chat.last_message_time)}</p>
                    </div>
                    <div className="chat-button">
                        <ButtonComponent text="Chat" onClick={() => navigate(`/event/${eventDetails?.id}/chats/${chat?.user?.id}`)}></ButtonComponent>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyEventChats;
