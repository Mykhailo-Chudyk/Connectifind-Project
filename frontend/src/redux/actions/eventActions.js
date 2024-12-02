import eventService from '../../services/eventservice';

export const FETCH_USER_EVENTS_REQUEST = 'FETCH_USER_EVENTS_REQUEST';
export const FETCH_USER_EVENTS_SUCCESS = 'FETCH_USER_EVENTS_SUCCESS';
export const FETCH_USER_EVENTS_FAILURE = 'FETCH_USER_EVENTS_FAILURE';

export const fetchUserEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_EVENTS_REQUEST });
  try {
    const events = await eventService.listUserEvents();
    dispatch({ type: FETCH_USER_EVENTS_SUCCESS, payload: events });
  } catch (error) {
    dispatch({ type: FETCH_USER_EVENTS_FAILURE, payload: error });
  }
}; 