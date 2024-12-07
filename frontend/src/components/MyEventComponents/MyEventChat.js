import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import eventservice from '../../services/eventservice.js'; 

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

        console.log(chatPartnerId);
    }, [eventDetails, chatPartnerId]);

    useEffect(() => {
        if (chatPartner) {
            fetchMessages();
        }
    }, [chatPartner]);

    return (
        <>
            <h1>Chat with {chatPartner?.first_name} {chatPartner?.last_name}</h1>
            {messages.map((msg, index) => (
                <div key={index}>
                    <p>{msg.content}</p>
                    <p>From: {msg.author.first_name} {msg.author.last_name}</p>
                    <p>Sent: {new Date(msg.time).toLocaleString()}</p>
                </div>
            ))}
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </>
    );
};

export default MyEventChat;
