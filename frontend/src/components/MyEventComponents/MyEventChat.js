import React, { useState, useEffect } from 'react';
import eventservice from '../../services/eventservice.js'; 

const MyEventChat = ({ eventDetails }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatPartner, setChatPartner] = useState(null);

    const fetchMessages = async () => {
        try {
            const data = await eventservice.listChatMessages(eventDetails.id, chatPartner.id);
            setMessages(data);
        } catch (err) {
            console.error('Error fetching chat messages:', err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const chatDetails = { eventId: eventDetails.id, recipientId: chatPartner.id };
            const message = await eventservice.createChatMessage(chatDetails, { content: newMessage });
            setMessages([...messages, message]);
            setNewMessage('');
        } catch (err) {
            console.error('Error sending chat message:', err);
        }
    };


    useEffect(() => {
        if (eventDetails?.participants?.length > 1) {
            const foundUser = eventDetails.participants.find(p => p.id !== 'currentUserId');
            setChatPartner(foundUser);
        }
    }, [eventDetails]);

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
