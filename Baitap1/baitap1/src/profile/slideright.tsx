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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
    const newPassword = (document.getElementById("newpass") as HTMLInputElement)
      .value;
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
  //hiện password đã nhập
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  //end hiện password
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
            <div className="bgclslideright">
              <div
                className="modal-content"
                style={{
                  backgroundColor: "rgb(62, 62, 91)",
                  borderRadius: "16px",
                  width: "500px",
                  height: "402px",
                  top: "40px",
                }}
              >
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Thay đổi mật khẩu
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <div className="coltrolrepass">
                    <div style={{ textAlign: "left" }}>
                      <label htmlFor="oldpass" className="form-label">
                        Mật khẩu hiện tại:
                      </label>
                      <div className={`input-group`}>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control`}
                          id="oldpass"
                        />
                        <button
                          className="eye"
                          type="button"
                          onClick={handleTogglePassword}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <label htmlFor="oldpass" className="form-label">
                        Mật khẩu mới:
                      </label>
                      <div className={`input-group`}>
                        <input
                          type={showPassword1 ? "text" : "password"}
                          className={`form-control`}
                          id="newpass"
                        />
                        <button
                          className="eye"
                          type="button"
                          onClick={handleTogglePassword1}
                        >
                          <FontAwesomeIcon
                            icon={showPassword1 ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <label htmlFor="oldpass" className="form-label">
                        Nhập lại mật khẩu mới:
                      </label>
                      <div className={`input-group`}>
                        <input
                          type={showPassword2 ? "text" : "password"}
                          className={`form-control`}
                          id="renewpass"
                        />
                        <button
                          className="eye"
                          type="button"
                          onClick={handleTogglePassword2}
                        >
                          <FontAwesomeIcon
                            icon={showPassword2 ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="" style={{marginBottom:"30px"}}>
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    style={{ color:"#FF7506", border:"1px solid #FF7506", width:"138px"}}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleChangePass}
                    style={{backgroundColor:"#FF7506", color:"white", width:"138px", marginLeft:"10px"}}
                  >
                    Lưu
                  </button>
                </div>
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
