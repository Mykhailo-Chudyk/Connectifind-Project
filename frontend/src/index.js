// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import './global.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_OAUTH2_CLIENT_ID } from './services/authservice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH2_CLIENT_ID}>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);