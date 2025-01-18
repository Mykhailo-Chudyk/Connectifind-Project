import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import eventservice from '../services/eventservice.js';
import { fetchUserEvents } from '../redux/actions/eventActions';
import MyEventMe from './MyEventComponents/MyEventMe.js';
import MyEventFeed from './MyEventComponents/MyEventFeed.js';
import MyEventPeople from './MyEventComponents/MyEventPeople.js';
import MyEventChats from './MyEventComponents/MyEventChats.js';
import MyEventAbout from './MyEventComponents/MyEventAbout.js';
import MyEventPerson from './MyEventComponents/MyEventPerson.js';
import MyEventChat from './MyEventComponents/MyEventChat.js';


const componentMap = {
  me: MyEventMe,
  feed: MyEventFeed,
  people: MyEventPeople,
  chats: MyEventChats,
  about: MyEventAbout,
  person: MyEventPerson,
  chat: MyEventChat,
};

const MyEvent = ({type = "me"}) => {
  const { eventId } = useParams();  
  const [eventDetails, setEventDetails] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventservice.getEventById(eventId);
        setEventDetails(details);
      } catch (err) {
        console.error('Error retrieving event:', err);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, events]); // Add events to dependency array

  const EventComponent = componentMap[type] || MyEventMe;

  return (
    <div>
      <EventComponent eventDetails={eventDetails} />
    </div>
  );
};

export default MyEvent;
