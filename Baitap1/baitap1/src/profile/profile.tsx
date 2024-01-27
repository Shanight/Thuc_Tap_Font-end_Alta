import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const auth = getAuth();

function Profile() {
  const [cameraRef, setCameraUrl] = useState("");

  useEffect(() => {
    //Lấy ảnh
    const cameraRef = ref(storage, "icon/fi_camera.png");

    Promise.all([getDownloadURL(cameraRef)])
      .then((urls) => {
        setCameraUrl(urls[0]);
      })
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });
  }, []);
  //end lấy ảnh

  const navigate = useNavigate();
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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Đăng xuất thành công
        navigate("/login"); // Chuyển hướng đến trang "Login"
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };
  return (
    <div className="app">
      <Topbar />
      <div className="displayflex">
        <div className="slidebar">
          <Sidebar />
        </div>
        <div className="main">
          <div className="row">
            <h1 className="tieude">Thông tin cơ bản</h1>
          </div>
          <div className="row thongtinchitietprofile">
            <div className="col-6">
              <img src="./logo192.png" alt="" className="profileimage" />
              <img src={cameraRef} alt="" className="profileimage2" />
              <p
                style={{
                  color: "#F5F5FF",
                  marginTop: "15px",
                  marginLeft: "85px",
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                Tuyết Nguyễn
              </p>
            </div>
            <div className="col-6">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputtext" className="form-label">
                    Họ:
                  </label>
                  <input
                    type="text"
                    className="form-control profile"
                    id="inputtext"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputten" className="form-label">
                    Tên:
                  </label>
                  <input
                    type="text"
                    className="form-control profile"
                    id="inputten"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputdate" className="form-label">
                    Ngày sinh:
                  </label>
                  <input
                    type="date"
                    className="form-control profile"
                    id="inputdate"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputAddress2" className="form-label">
                    Số điện thoại:
                  </label>
                  <input
                    type="tel"
                    className="form-control profile"
                    id="inputAddress2"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control profile disabledprofile"
                    disabled
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputState" className="form-label">
                    Tên đăng nhập:
                  </label>
                  <input
                    type="text"
                    className="form-control profile disabledprofile"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputZip" className="form-label">
                    Vai trò
                  </label>
                  <input
                    type="text"
                    className="form-control profile disabledprofile"
                    id="inputZip"
                    disabled
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
