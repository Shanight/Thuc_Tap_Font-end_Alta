import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import './Slidebar.css';
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="row side">
            <img src={logo} alt="" className='logo'/>
        </div>

        <div className="row play">
            <FontAwesomeIcon icon={faCirclePlay} style={{ boxSizing:"border-box", marginTop:"30%"}} className='buttonslide' />
            <p>Kho bản ghi</p>
        </div>
      </div>
    );
  }
  
  export default Sidebar;