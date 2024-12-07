import React from "react";
import {useNavigate} from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import ButtonComponent from "../ButtonComponent/ButtonComponent";


const MyEventPeople = ({ eventDetails }) => {
    const navigate = useNavigate();



    return (
        <div className="people-container">
            <h3>Attendees:</h3>
            <div className="people-list">
                {eventDetails?.participants.map((participant) => 
                    // <div onClick={() => navigate('/event/' + eventDetails.id + '/people/' + participant.id)}>
                    //     {participant.first_name} {participant.last_name}
                    // </div>
                    <div key={participant?.id} onClick={() => navigate('/event/' + eventDetails.id + '/people/' + participant.id)} className='people-item'>
                        <div className='people-item-image'>
                            {participant?.image && <img src={participant?.image} alt={participant.first_name + " " + participant.last_name} />}
                            {!participant?.image && <FaUser />}
                        </div>
                    <div className='people-item-body'>
                        <p className='people-author'>{participant.first_name} {participant.last_name}</p>
                        <p className='people-title'>{participant.description}</p>
                        {/* TODO: Add goal to the participant (FIX SERIALIZER) */}
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