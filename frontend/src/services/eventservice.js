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

const joinEventWithCode = async (code) => {
  try {
    const response = await api.post('events/join-with-code/', { code });
    return response.data;
  } catch (error) {
    console.error('Error joining event with code:', error.response);
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

const listFeedPosts = async (eventId) => {
  try {
    const response = await api.get(`feedposts/list/${eventId}/`);  
    return response.data;
  } catch (error) {
    console.error('Error listing feed posts:', error.response);
    throw error.response.data;
  }
};

const createFeedPost = async (eventId, postData) => {
  try {
    const response = await api.post(`feedposts/create/${eventId}/`, postData); 
    return response.data;
  } catch (error) {
    console.error('Error creating feed post:', error.response);
    throw error.response.data;
  }
};

const listChatMessages = async (eventId, senderId) => {
  try {
    const response = await api.get(`chats/messages/${eventId}/${senderId}/`);
    return response.data;
  } catch (error) {
    console.error('Error listing chat messages:', error.response);
    throw error.response.data;
  }
};

const sendChatMessage = async (eventId, recipientId, messageData) => {
  try {
    const response = await api.post(`chats/send/${eventId}/${recipientId}/`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error.response);
    throw error.response.data;
  }
};

const listAllChats = async (eventId) => {
  try {
    const response = await api.get(`events/${eventId}/users-with-messages/`); 
    return response.data;
  } catch (error) {
    console.error('Error listing all chats:', error.response);
    throw error.response.data;
  }
};

const listUserEvents = async () => {
  try {
    const response = await api.get('events/user/');
    return response.data;
  } catch (error) {
    console.error('Error retrieving user events:', error.response);
    throw error.response.data;
  }
};

const getCategories = async () => {
  try {
    const response = await api.get('/api/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.response);
    throw error.response.data;
  }
};

const updateGoal = async (eventId, goal) => {
  try {
    console.log(goal);
    const response = await api.patch(`events/${eventId}/update-goal/`, { goal });
    return response.data;
  } catch (error) {
    console.error('Error updating goal:', error.response);
    throw error.response.data;
  }
};

export default {
  addEvent,
  listEvents,
  getEventById,
  joinEvent,
  joinEventWithCode,
  leaveEvent,
  listFeedPosts,
  createFeedPost,
  listChatMessages,
  sendChatMessage,
  listAllChats,
  listUserEvents,
  getCategories,
  updateGoal,
};