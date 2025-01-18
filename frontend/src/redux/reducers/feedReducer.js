import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
  ADD_FEED_POST,
  DELETE_FEED_POST,
} from '../actions/feedActions';

const initialState = {
  loading: false,
  feeds: {}, // Organized by eventId
  error: null,
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        feeds: {
          ...state.feeds,
          [action.payload.eventId]: action.payload.posts
        }
      };
    case FETCH_FEED_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FEED_POST:
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [action.payload.eventId]: [
            ...(state.feeds[action.payload.eventId] || []),
            action.payload.post
          ]
        }
      };
    case DELETE_FEED_POST:
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [action.payload.eventId]: state.feeds[action.payload.eventId]
            .filter(post => post.id !== action.payload.postId)
        }
      };
    default:
      return state;
  }
};

export default feedReducer; 