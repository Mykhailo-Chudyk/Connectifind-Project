import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import eventservice from '../../services/eventservice.js';
import { fetchUserEvents } from '../../redux/actions/eventActions.js';
import MyEventMe from './MyEventMe.js';
import MyEventFeed from './MyEventFeed.js';
import MyEventPeople from './MyEventPeople.js';
import MyEventChats from './MyEventChats.js';
import MyEventAbout from './MyEventAbout.js';
import MyEventPerson from './MyEventPerson.js';
import MyEventChat from './MyEventChat.js';


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
