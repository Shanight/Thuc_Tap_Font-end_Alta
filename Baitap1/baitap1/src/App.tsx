import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes,redirect } from "react-router-dom";

import Home from './Home/Home';
import Login from './Login/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/login" Component={Login} />
        <Route  path="/" Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
