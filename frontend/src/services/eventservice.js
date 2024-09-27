import api from './apiservice';

const addEvent = async (eventData) => {
  try {
    const response = await api.post('events/create/', eventData);
    return response.data;  
  } catch (error) {
    console.error('Error creating event:', error.response);
    throw error.response.data;
  }
};

const listEvents = async () => {
  try {
    const response = await api.get('events/list/');
    return response.data;  
  } catch (error) {
    console.error('Error retrieving events:', error.response);
    throw error.response.data;
  }
};

const getEventById = async (eventId) => {
  try {
    const response = await api.get(`events/${eventId}/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving event:', error.response);
    throw error.response.data;
  }
};

const joinEvent = async (eventId) => {
  try {
    const response = await api.post(`events/join/${eventId}/`);
    return response.data;
  } catch (error) {
    console.error('Error joining event:', error.response);
    throw error.response.data;
  }
};

const leaveEvent = async (eventId) => {
  try {
    const response = await api.post(`events/leave/${eventId}/`);
    return response.data;
  } catch (error) {
    console.error('Error leaving event:', error.response);
    throw error.response.data;
  }
};

export default {
  addEvent,
  listEvents,
  getEventById,
  joinEvent,
  leaveEvent,
};