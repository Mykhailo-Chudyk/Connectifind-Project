import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import eventservice from '../../services/eventservice.js'; 
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import InputField from '../InputField/InputField.js';

const MyEventChat = ({ eventDetails }) => {
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatPartner, setChatPartner] = useState(null);

    const chatPartnerId = location.pathname.split('/').pop();

    const fetchMessages = async () => {
        try {
            const data = await eventservice.listChatMessages(eventDetails.id, chatPartnerId);
            setMessages(data);
        } catch (err) {
            console.error('Error fetching chat messages:', err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const messageData = { content: newMessage };
            const message = await eventservice.sendChatMessage(eventDetails?.id, chatPartnerId, messageData);
            setMessages([...messages, message]);
            setNewMessage('');
        } catch (err) {
            console.error('Error sending chat message:', err);
        }
    };

    useEffect(() => {
        if (eventDetails?.participants?.length > 1) {
            const foundUser = eventDetails.participants.find(p => p.id === chatPartnerId);
            setChatPartner(foundUser);
        }
    }, [eventDetails, chatPartnerId]);

    useEffect(() => {
        if (chatPartner) {
            fetchMessages();
        }
    }, [chatPartner]);

    return (
        <div className="feed-container">
            <h1>Chat with {chatPartner?.first_name} {chatPartner?.last_name}</h1>
            {messages.map((msg, index) => (
                <div key={index} className="event-details-container">
                    <div className="event-details-header">
                        <div className="event-details-date">
                            <p>{msg.author.first_name} {msg.author.last_name}</p>
                        </div>
                        <div className="event-details-location">
                            <p>{new Date(msg.time).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="event-details-body">
                        <p>{msg.content}</p>
                    </div>
                </div>
            ))}
            <div className="feed-post-bottom">
                <div className="feed-post-input">
                    <InputField 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        multiline={true}
                    />  
                </div>
                <div className="feed-post-button">  
                    <ButtonComponent text="Send" onClick={sendMessage} width="300px"/>
                </div>
            </div>
        </div>
    );
};

export default MyEventChat;
