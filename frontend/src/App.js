import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddEvent from './components/AddEvent.js';
import Events from './components/Events.js';
import Event from './components/Event.js';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<>Home</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/events/:eventId" element={<Event/>} />
        <Route path="/me/profile" element={<>Default profile</>} />
        <Route path="/me/settings" element={<>Settings</>} />
        <Route path="/event/:eventId/me" element={<>Event customized profile</>} />
        <Route path="/event/:eventId/feed" element={<>Event feed</>} />
        <Route path="/event/:eventId/people" element={<>All the people who attend the event</>} />
        <Route path="/event/:eventId/people/:userId" element={<>A user who attends event</>} />
        <Route path="/event/:eventId/chats" element={<>All the chats user has in a specific event</>} /> 
        <Route path="/event/:eventId/about" element={<>About the event</>} />
      </Routes>
    </Router>
  );
}

export default App;