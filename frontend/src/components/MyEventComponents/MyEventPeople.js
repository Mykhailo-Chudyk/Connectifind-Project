import React from "react";
import {useNavigate} from 'react-router-dom';
import { FaUser, FaStar } from "react-icons/fa";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useSelector } from 'react-redux';
import useDeviceType from '../../hooks/useDeviceType';
import { useLocation } from 'react-router-dom';
import './styles.scss';

const MyEventPeople = ({ eventDetails }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const location = useLocation();
    const { isMobile } = useDeviceType();
    
    // Check if the current user has completed their profile
    const currentUserParticipant = eventDetails?.participants.find(
        participant => participant.username === user.user.username
    );
    
    const hasIncompleteProfile = !currentUserParticipant?.goal || !currentUserParticipant?.description;
    const isMissingGoal = !currentUserParticipant?.goal;
    const isMissingDescription = !currentUserParticipant?.description;

    return (
        <div className={`people-container ${isMobile ? 'mobile' : ''}`}>
            <h1 className="people-title">Attendees</h1>
            <p className="people-label">People who are attending this event</p>
            
            {hasIncompleteProfile && (
                <div className="profile-incomplete-warning">
                    <h3>Complete Your Profile to Connect</h3>
                    <p>
                        You need to add {!currentUserParticipant?.goal && !currentUserParticipant?.description 
                            ? 'a goal and description' 
                            : !currentUserParticipant?.goal 
                                ? 'a goal' 
                                : 'a description'
                        } to your profile before you can see other attendees.
                    </p>
                    <div className="profile-update-buttons">
                        {isMissingGoal && (
                            <ButtonComponent 
                                text="Update Goal" 
                                level="primary" 
                                onClick={() => navigate(location.pathname.replace('people', 'me'))} 
                                width="140px"
                                style={{ margin: '0 5px' }}
                            />
                        )}
                        {isMissingDescription && (
                            <ButtonComponent 
                                text="Update Description" 
                                level="primary" 
                                onClick={() => navigate('/me')} 
                                width="170px"
                                style={{ margin: '0 5px' }}
                            />
                        )}
                    </div>
                </div>
            )}
            
            <div className={`people-list ${hasIncompleteProfile ? 'blurred-content' : ''}`}>
                {eventDetails?.participants
                    .filter(participant => participant.username !== user.user.username)
                    .map((participant) => 
                        <div key={participant?.id} 
                             className={`people-item ${hasIncompleteProfile ? 'disabled' : ''}`}
                             onClick={hasIncompleteProfile ? null : () => navigate('/event/' + eventDetails.id + '/people/' + participant.id)}>
                            <div className='people-item-image'>
                                {participant?.avatar && <img src={participant?.avatar} alt={participant.first_name + " " + participant.last_name} />}
                                {!participant?.avatar && <FaUser />}
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
                                <ButtonComponent 
                                    text="See profile" 
                                    level="secondary" 
                                    onClick={hasIncompleteProfile ? (e) => e.stopPropagation() : () => {navigate(`${eventDetails.id}/people/${participant.id}`)}} 
                                    width="125px"
                                    disabled={hasIncompleteProfile}
                                />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default MyEventPeople;