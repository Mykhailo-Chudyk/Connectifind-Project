import eventService from '../../services/eventservice';

export const FETCH_PUBLIC_EVENTS_REQUEST = 'FETCH_PUBLIC_EVENTS_REQUEST';
export const FETCH_PUBLIC_EVENTS_SUCCESS = 'FETCH_PUBLIC_EVENTS_SUCCESS';
export const FETCH_PUBLIC_EVENTS_FAILURE = 'FETCH_PUBLIC_EVENTS_FAILURE';

export const fetchPublicEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_PUBLIC_EVENTS_REQUEST });
  try {
    const events = await eventService.listEvents();
    dispatch({ type: FETCH_PUBLIC_EVENTS_SUCCESS, payload: events });
  } catch (error) {
    dispatch({ type: FETCH_PUBLIC_EVENTS_FAILURE, payload: error });
  }
}; 