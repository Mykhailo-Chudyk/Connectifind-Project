import {
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAILURE,
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
  ADD_CHAT_MESSAGE,
} from '../actions/chatActions';

const initialState = {
  loading: false,
  chats: {}, // Organized by eventId
  messages: {}, // Organized by eventId and partnerId
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: {
          ...state.chats,
          [action.payload.eventId]: action.payload.chats
        }
      };
    case FETCH_CHATS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_CHAT_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: {
          ...state.messages,
          [action.payload.eventId]: {
            ...state.messages[action.payload.eventId],
            [action.payload.partnerId]: action.payload.messages
          }
        }
      };
    case FETCH_CHAT_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_CHAT_MESSAGE:
      const { eventId, partnerId, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [eventId]: {
            ...state.messages[eventId],
            [partnerId]: [
              ...(state.messages[eventId]?.[partnerId] || []),
              message
            ]
          }
        }
      };
    default:
      return state;
  }
};

export default chatReducer; 