import eventService from '../../services/eventservice';

export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';
export const ADD_FEED_POST = 'ADD_FEED_POST';
export const DELETE_FEED_POST = 'DELETE_FEED_POST';

export const fetchFeed = (eventId) => async (dispatch) => {
  dispatch({ type: FETCH_FEED_REQUEST });
  try {
    const posts = await eventService.listFeedPosts(eventId);
    dispatch({ type: FETCH_FEED_SUCCESS, payload: { eventId, posts } });
  } catch (error) {
    dispatch({ type: FETCH_FEED_FAILURE, payload: error });
  }
};

export const addPost = (eventId, post) => ({
  type: ADD_FEED_POST,
  payload: { eventId, post }
});

export const deletePost = (eventId, postId) => ({
  type: DELETE_FEED_POST,
  payload: { eventId, postId }
}); 