import SignUp from './components/Authorization/SignUp.js';
import Login from './components/Authorization/Login.js';
import AddEvent from './components/AddEvent/AddEvent.js';
import Events from './components/Events/Events.js';
import Event from './components/Event/Event.js';
import MyEvent from './components/MyEventComponents/MyEvent.js';
import AuthenticatedHome from './components/Home/AuthenticatedHome';
import UnauthenticatedHome from './components/Home/UnauthenticatedHome';
import DefaultProfile from './components/DefaultProfile/DefaultProfile.js';
import Layout from './Layout.js';
import React, {useContext, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext.js';
import Settings from './components/Settings/Settings.js';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <ToastProvider>
      <Router>
        <Routes> 
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={isAuthenticated ? <AuthenticatedHome /> : <UnauthenticatedHome />} />
            <Route path="/events/" element={<Events filter="all"/>} />
            <Route path="/events/:eventId" element={<Event/>} />
            {isAuthenticated && (
              <>
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/me" element={<DefaultProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/event/:eventId/me" element={<MyEvent type="me" />} />
                <Route path="/event/:eventId/feed" element={<MyEvent type="feed" />} />
                <Route path="/event/:eventId/people" element={<MyEvent type="people" />} />
                <Route path="/event/:eventId/people/:userId" element={<MyEvent type="person" />} />
                <Route path="/event/:eventId/chats" element={<MyEvent type="chats" />} />
                <Route path="/event/:eventId/chats/:userId" element={<MyEvent type="chat" />} />
                <Route path="/event/:eventId/about" element={<MyEvent type="about" />} />
                <Route path="/my-events" element={<Events filter="created" />} />
                <Route path="/joined-events" element={<Events filter="joined" />} />
              </>
            )}
          </Route>
          <Route path="/" element={<UnauthenticatedHome />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;