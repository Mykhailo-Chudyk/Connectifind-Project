import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<>Home</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<>Events</>} />
        <Route path="/add-event" element={<>Add Event</>} />
        <Route path="/event/:eventId" element={<>Event</>} />
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