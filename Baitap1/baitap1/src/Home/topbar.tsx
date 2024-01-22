import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./topbar.css";
import logo from "../logo.svg";
const Topbar = () => {
  return (
    <div className="topbar">
      <div className="dropdown topbarbutton">
        <button
          className="topbarbutton1 dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Tiếng Việt
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Tiếng Anh
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
