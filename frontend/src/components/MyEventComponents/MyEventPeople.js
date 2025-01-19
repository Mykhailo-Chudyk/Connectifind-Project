import React from "react";
import {useNavigate} from 'react-router-dom';
import { FaUser, FaStar } from "react-icons/fa";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useSelector } from 'react-redux';

const MyEventPeople = ({ eventDetails }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    return (
        <div className="people-container">
            <h1>Attendees</h1>
            <p className="people-label">People who are attending this event</p>
            <div className="people-list">
                {eventDetails?.participants
                    .filter(participant => participant.username !== user.user.username)
                    .map((participant) => 
                        <div key={participant?.id} onClick={() => navigate('/event/' + eventDetails.id + '/people/' + participant.id)} className='people-item'>
                            <div className='people-item-image'>
                                {participant?.avatar && <img src={participant?.avatar} alt={participant.first_name + " " + participant.last_name} />}
                                {!participant?.image && <FaUser />}
                            </div>
                            <div className='people-item-body'>
                                <p className='people-author'>
                                    {participant.first_name} {participant.last_name}
                                    <div className="people-item-author-star">
                                        {eventDetails.author.id === participant.id && <FaStar style={{ marginLeft: '5px', color: '#18807D' }} />}
                                    </div>
                                </p>
                                <p className='people-title'>{participant.description}</p>
                                <p className='people-description'>Goal: {participant.goal}</p> 
                            </div>
                            <div className='people-item-actions'>
                                <ButtonComponent text="See profile" level="secondary" onClick={() => {navigate(`${eventDetails.id}/people/${participant.id}`)}} />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default MyEventPeople;