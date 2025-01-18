import eventService from '../../services/eventservice';

export const FETCH_USER_EVENTS_REQUEST = 'FETCH_USER_EVENTS_REQUEST';
export const FETCH_USER_EVENTS_SUCCESS = 'FETCH_USER_EVENTS_SUCCESS';
export const FETCH_USER_EVENTS_FAILURE = 'FETCH_USER_EVENTS_FAILURE';
export const JOIN_EVENT_SUCCESS = 'JOIN_EVENT_SUCCESS';
export const LEAVE_EVENT_SUCCESS = 'LEAVE_EVENT_SUCCESS';

export const fetchUserEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_EVENTS_REQUEST });
  try {
    const events = await eventService.listUserEvents();
    dispatch({ type: FETCH_USER_EVENTS_SUCCESS, payload: events });
  } catch (error) {
    dispatch({ type: FETCH_USER_EVENTS_FAILURE, payload: error });
  }
};

export const joinEventSuccess = (event) => ({
  type: JOIN_EVENT_SUCCESS,
  payload: event
});

export const leaveEventSuccess = (eventId) => ({
  type: LEAVE_EVENT_SUCCESS,
  payload: eventId
}); 