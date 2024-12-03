import React, { useState, useEffect } from 'react';
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EventWrapper from '../EventWrapper/EventWrapper';
import eventservice from '../../services/eventservice';
import { useNavigate } from 'react-router-dom';

const UnauthenticatedHome = () => {
  const [publicEvents, setPublicEvents] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // TODO: fetch only three events to display on the home page
    const fetchEvents = async () => {
      try {
        const data = await eventservice.listEvents();
        setPublicEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);


  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1>Building a bridge between event attendees</h1>
        {/* TODO:  replace with changing texts */}
        <h3>Find the ones with shared interests</h3>
      </div>
      <div className='home-row'>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="345px"/>
        {/* TODO: add functionality */}
        <ButtonComponent text="Enter Private Event Code" size="large" onClick={() => {}} width="345px"/>
        <ButtonComponent text="Create Event" size="large" onClick={() => {navigate('/login')}} width="345px"/>
      </div>
      <div className='home-row space-top'>
        <h2>Explore public events nearby and join them</h2>
      </div>
      <div className='home-row vertical-scroll'>
        {publicEvents.map((event) => (
          <EventWrapper key={event.id} event={event} />
        ))}
      </div>
      <div className='home-row'>
        <ButtonComponent text="View all events" size="large" onClick={() => {navigate('/events')}} width="345px"/>
      </div>
      <div className='home-row space-top'>
        <h3> 
        At ConnectiFind, we transform the typical event experience by seamlessly bridging the gap between attendees. It’s common to feel hesitant about approaching someone new, but what if you could know their interests and goals beforehand? Our platform does just that, empowering you to connect with the right people right away. Whether you’re looking to collaborate, find a mentor, or share insights, ConnectiFind makes every interaction more intentional and productive. Join us to make your next event the most rewarding yet.
        </h3>
      </div>
      {/* TODO: it's not that important right now. Finish it later */}
      {/* <div className='home-row home-phrase-container'>
        <p className="home-phrase">⭐ Discover shared interests</p>
        <p className="home-phrase">💬 Connect with like-minded individuals</p>
        <p className="home-phrase">🚀 Make every interaction count</p>
        <p className="home-phrase">💡 Discover new ideas</p>
        <p className="home-phrase">💪 Build your network</p>
        <p className="home-phrase">🤝 Create opportunities</p>
        <p className="home-phrase">💰 Save time and money</p>
        <p className="home-phrase">🌟 Make lasting connections</p>
      </div> */}
    </div>
  );
};

export default UnauthenticatedHome;