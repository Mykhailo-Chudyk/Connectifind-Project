import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import eventReducer from '../reducers/eventReducer';
import feedReducer from '../reducers/feedReducer';
import chatReducer from '../reducers/chatReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    feed: feedReducer,
    chat: chatReducer,
  },
});