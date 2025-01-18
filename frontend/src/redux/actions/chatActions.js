import eventService from '../../services/eventservice';

export const FETCH_CHATS_REQUEST = 'FETCH_CHATS_REQUEST';
export const FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS';
export const FETCH_CHATS_FAILURE = 'FETCH_CHATS_FAILURE';
export const FETCH_CHAT_MESSAGES_REQUEST = 'FETCH_CHAT_MESSAGES_REQUEST';
export const FETCH_CHAT_MESSAGES_SUCCESS = 'FETCH_CHAT_MESSAGES_SUCCESS';
export const FETCH_CHAT_MESSAGES_FAILURE = 'FETCH_CHAT_MESSAGES_FAILURE';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';

export const fetchChats = (eventId) => async (dispatch) => {
  dispatch({ type: FETCH_CHATS_REQUEST });
  try {
    const chats = await eventService.listAllChats(eventId);
    dispatch({ type: FETCH_CHATS_SUCCESS, payload: { eventId, chats } });
  } catch (error) {
    dispatch({ type: FETCH_CHATS_FAILURE, payload: error });
  }
};

export const fetchChatMessages = (eventId, partnerId) => async (dispatch) => {
  dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
  try {
    const messages = await eventService.listChatMessages(eventId, partnerId);
    dispatch({ 
      type: FETCH_CHAT_MESSAGES_SUCCESS, 
      payload: { eventId, partnerId, messages } 
    });
  } catch (error) {
    dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, payload: error });
  }
};

export const addChatMessage = (eventId, partnerId, message) => ({
  type: ADD_CHAT_MESSAGE,
  payload: { eventId, partnerId, message }
}); 