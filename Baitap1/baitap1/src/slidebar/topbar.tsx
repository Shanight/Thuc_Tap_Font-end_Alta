import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import logo from "../logo.svg";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
      } else {
        // Người dùng đã đăng xuất
        navigate("/login"); // Chuyển hướng đến trang "Login"
      }
    });

    return () => {
      unsubscribe(); // Hủy đăng ký lắng nghe khi component bị hủy
    };
  }, [navigate]);

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

      {user ? (
        <a href="/profile" className="topbara">
          <div className="admin">
            <img src="./logo192.png" alt="" className="adminimage" />
            <div className="texttopbar">
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                  lineHeight: "24px",
                  color: "white",
                }}
              >
                Ng.Tuyết
              </span>
              <p
                style={{
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  lineHeight: "17.07px",
                  color: "#B65100",
                }}
              >
                Admin
              </p>
            </div>
          </div>
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default Topbar;
