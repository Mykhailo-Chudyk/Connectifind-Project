import {
  FETCH_USER_EVENTS_REQUEST,
  FETCH_USER_EVENTS_SUCCESS,
  FETCH_USER_EVENTS_FAILURE,
  JOIN_EVENT_SUCCESS,
  LEAVE_EVENT_SUCCESS,
} from '../actions/eventActions';

const initialState = {
  loading: false,
  events: [],
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_EVENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case FETCH_USER_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case JOIN_EVENT_SUCCESS:
      return { 
        ...state, 
        events: [...state.events, action.payload]
      };
    case LEAVE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
};

export default eventReducer; 