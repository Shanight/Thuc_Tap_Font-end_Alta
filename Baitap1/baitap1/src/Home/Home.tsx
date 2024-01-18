import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '././Home.css';
import Sidebar from './Slidebar';



function Home() {
  return (
      <div className="app">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10">
              gewewe
            </div>
          </div>
        
      </div>
  );
}

export default Home;
