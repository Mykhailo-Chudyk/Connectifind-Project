import usersService from '../../services/userservice';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const user = await usersService.getUserInfo();
    dispatch({ type: FETCH_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, payload: error });
  }
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
}); 