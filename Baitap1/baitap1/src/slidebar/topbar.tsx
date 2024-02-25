import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import logo from "../logo.svg";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

const Topbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);

  useEffect(() => {
    //Lấy dữ liệu người dùng,nếu đăng nhập thì sẽ lấy dữ liệu, không thì thôi
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user information: ", error);
      }
    };

    //kết thúc lấy dữ liệu người dùng

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
        setIsLoggedIn(true);
        fetchUserInfo();
      } else {
        // Người dùng đã đăng xuất
        setIsLoggedIn(false);
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
            <img src={userInfo?.imageuser} alt="" className="adminimage" />
            <div className="texttopbar">
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                  lineHeight: "24px",
                  color: "white",
                }}
              >
                {userInfo?.lastname} {userInfo?.firstname}
              </span>
              <p
                style={{
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  lineHeight: "17.07px",
                  color: "#B65100",
                }}
              >
                {userInfo?.role}
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
