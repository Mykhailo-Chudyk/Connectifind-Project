import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import eventReducer from '../reducers/eventReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
  },
});
