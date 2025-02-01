import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { fetchChats } from '../../redux/actions/chatActions';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { formatEventDate } from '../../utils/dateTimeUtils';
import './styles.scss';
import useDeviceType from '../../hooks/useDeviceType';

const MyEventChats = ({ eventDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chats, loading } = useSelector((state) => state.chat);
    const eventChats = chats[eventDetails?.id] || [];
    const { isMobile } = useDeviceType();

    useEffect(() => {
        if (eventDetails?.id) {
            if (!chats[eventDetails.id]) {
                dispatch(fetchChats(eventDetails.id));
            }
            // Refresh chats in background
            dispatch(fetchChats(eventDetails.id));
        }
    }, [eventDetails?.id, dispatch]);

    return (
        <div className={`chats-container ${isMobile ? 'mobile' : ''}`}>
            <h1 className='chats-title'>Chats</h1>
            <p className='chats-label'>Chat with other participants</p>
            {eventChats.map((chat) => (
                <div key={chat?.id} className='single-chat-container' onClick={() => navigate(`/event/${eventDetails?.id}/chats/${chat?.user?.id}`)}>
                    <div className="chat-avatar">
                        {chat.user.avatar && <img src={chat.user.avatar} alt="avatar" />}
                        {!chat.user.avatar && <FaUserCircle />}
                    </div>
                    <div className="chat-details">
                        <p className='chat-name'>{chat.user.first_name} {chat.user.last_name}</p>
                        <p className='chat-last-message'>{chat.last_message_content}</p>
                        <p className="chat-time">{formatEventDate(chat.last_message_time)}</p>
                    </div>
                    <div className="chat-button">
                        <ButtonComponent text="Chat" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyEventChats;
