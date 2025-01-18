import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatMessages, addChatMessage } from '../../redux/actions/chatActions';
import eventservice from '../../services/eventservice';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import InputField from '../InputField/InputField';
import './styles.scss';

const MyEventChat = ({ eventDetails }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [chatPartner, setChatPartner] = useState(null);
    const chatPartnerId = location.pathname.split('/').pop();
    
    const { messages, loading } = useSelector((state) => state.chat);
    const chatMessages = messages[eventDetails?.id]?.[chatPartnerId] || [];

    useEffect(() => {
        if (eventDetails?.participants?.length > 1) {
            const foundUser = eventDetails.participants.find(p => p.id === chatPartnerId);
            setChatPartner(foundUser);
        }
    }, [eventDetails, chatPartnerId]);

    useEffect(() => {
        if (chatPartner && eventDetails?.id) {
            if (!messages[eventDetails.id]?.[chatPartnerId]) {
                dispatch(fetchChatMessages(eventDetails.id, chatPartnerId));
            }
            // Refresh messages in background
            dispatch(fetchChatMessages(eventDetails.id, chatPartnerId));
        }
    }, [chatPartner, eventDetails?.id, chatPartnerId, dispatch]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const messageData = { content: newMessage };
            const message = await eventservice.sendChatMessage(eventDetails?.id, chatPartnerId, messageData);
            dispatch(addChatMessage(eventDetails.id, chatPartnerId, message));
            setNewMessage('');
        } catch (err) {
            console.error('Error sending chat message:', err);
        }
    };

    return (
        <div className="feed-container">
            <div className="feed-header">
                <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
                <h1>Chat with {chatPartner?.first_name} {chatPartner?.last_name}</h1>
            </div>
            {chatMessages.map((msg, index) => (
                <div key={index} className="feed-details-container">
                    <div className="feed-details-header">
                        <div className="feed-details-date">
                            <p>{msg.author.first_name} {msg.author.last_name}</p>
                        </div>
                        <div className="feed-details-date">
                            <p>{new Date(msg.time).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="feed-details-body">
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
                    <ButtonComponent text="Send" onClick={sendMessage} width="300px" size="large"/>
                </div>
            </div>
        </div>
    );
};

export default MyEventChat;
