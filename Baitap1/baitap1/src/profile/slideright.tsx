/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  User,
  updatePassword,
} from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

const auth = getAuth();

function Rightbar() {
  const [fi_log_outRef, setfi_log_outUrl] = useState("");
  const [PadlockRef, setPadlockUrl] = useState("");
  const [fi_editRef, setfi_editUrl] = useState("");

  useEffect(() => {
    //Lấy ảnh
    const cameraRef = ref(storage, "icon/fi_camera.png");
    const fi_log_outRef = ref(storage, "icon/fi_log-out.png");
    const PadlockRef = ref(storage, "icon/Padlock.png");
    const fi_editRef = ref(storage, "icon/fi_edit.png");

    Promise.all([
      getDownloadURL(cameraRef),
      getDownloadURL(fi_log_outRef),
      getDownloadURL(PadlockRef),
      getDownloadURL(fi_editRef),
    ])
      .then((urls) => {
        setfi_log_outUrl(urls[1]);
        setPadlockUrl(urls[2]);
        setfi_editUrl(urls[3]);
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

  //resetmatkhau
  const handleChangePass = () => {
    const newPassword = (document.getElementById("newpass") as HTMLInputElement).value;
    const user = auth.currentUser;
  
    if (user && newPassword) {
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Thành công");
        })
        .catch((error) => {
          console.log("Thất bại");
        });
    }
  };
  
  //endresetmatkhau
  return (
    <div className="app">
      <div className="slideright">
        <div className="row profileslideright" style={{ marginTop: "22%" }}>
          <div className="imgslideright">
            <img src={fi_editRef} alt="" className="imgprofileslideright" />
          </div>
          <p className="textprofileslideright">Sửa thông tin</p>
        </div>
        <button
          className="row profileslideright"
          style={{ background: "none", border: "none" }}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <div className="imgslideright">
            <img src={PadlockRef} alt="" className="imgprofileslideright" />
          </div>
          <p className="textprofileslideright">Đổi mật khẩu</p>
        </button>

        {/* form đổi mật khẩu*/}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <input type="password" id="newpass"/>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleChangePass}>
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end form đổi mật khẩu*/}
        <button
          className="row profileslideright"
          onClick={handleSignOut}
          style={{ background: "none", border: "none" }}
        >
          <div className="imgslideright">
            <img src={fi_log_outRef} alt="" className="imgprofileslideright" />
          </div>
          <p className="textprofileslideright">Đăng xuất</p>
        </button>
      </div>
    </div>
  );
}

export default Rightbar;
