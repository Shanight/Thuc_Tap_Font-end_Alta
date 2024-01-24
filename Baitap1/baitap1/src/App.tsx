import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./Home/Home";
import Login from "./Login/login";
import Playlist from "./playlist/Playlist";
import Calendar from "./calendar/calendar";
import Resetpass from './Login/resetpasssword';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // You can perform additional actions here if needed
      } else {
        // User is signed out
        // You can perform additional actions here if needed
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login/resetpass" element={<Resetpass />} />
        <Route
          path="*"
          element={
            // Use Navigate component to conditionally redirect the user
            auth.currentUser ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
