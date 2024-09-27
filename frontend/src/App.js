import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddEvent from './components/AddEvent.js';
import Events from './components/Events.js';
import Event from './components/Event.js';
import MyEvent from './components/MyEvent.js';
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
        <Route path="/events/" element={<Events/>} />
        {/* <Route path="/my-events" element={<Events }/>} /> */}
        <Route path="/events/:eventId" element={<Event/>} />
        <Route path="/me/profile" element={<>Default profile</>} />
        <Route path="/me/settings" element={<>Settings</>} />
        <Route path="/event/:eventId/me" element={<MyEvent type="me" />} />
        <Route path="/event/:eventId/feed" element={<MyEvent type="feed" />} />
        <Route path="/event/:eventId/people" element={<MyEvent type="people" />} />
        <Route path="/event/:eventId/people/:userId" element={<MyEvent type="people" />} />
        <Route path="/event/:eventId/chats" element={<MyEvent type="chats" />} />
        <Route path="/event/:eventId/about" element={<MyEvent type="about" />} />
      </Routes>
    </Router>
  );
}

export default App;