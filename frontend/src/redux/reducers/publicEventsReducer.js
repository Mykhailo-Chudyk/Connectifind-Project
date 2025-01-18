import {
  FETCH_PUBLIC_EVENTS_REQUEST,
  FETCH_PUBLIC_EVENTS_SUCCESS,
  FETCH_PUBLIC_EVENTS_FAILURE,
} from '../actions/publicEventsActions';

const initialState = {
  loading: false,
  events: [],
  error: null,
};

const publicEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_EVENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PUBLIC_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case FETCH_PUBLIC_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default publicEventsReducer; 