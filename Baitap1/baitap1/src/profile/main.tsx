import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import Profile from "./profile";
import Rightbar from "./slideright";

const auth = getAuth();

function Mainprofile() {
  
  return (
    <div className="app">
      <Topbar />
      <div className="displayflex">
        <div className="slidebar">
          <Sidebar />
        </div>
        <div className="main">
          <Profile />
        </div>

        <div className="slideright">
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

export default Mainprofile;
