/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  User,
  updatePassword,
} from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import "firebase/firestore";
import "./style.css";
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

    const oldpassword = (document.getElementById("oldpass") as HTMLInputElement)
      .value;
    const renewpass = (document.getElementById("renewpass") as HTMLInputElement)
      .value;

    const user = auth.currentUser;
    if (newPassword == renewpass) {
      if (user && renewpass) {
        updatePassword(user, renewpass)
          .then(() => {
            console.log("Thành công");
            alert("Thành công");
          })
          .catch((error) => {
            console.log("Thất bại");
          });
      }
    } else {
      alert("Mật khẩu mới không trùng khớp");
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

  const fileInput = document.getElementById(
    "image-upload"
  ) as HTMLInputElement | null;
  const imageNameElement = document.getElementById(
    "image-name"
  ) as HTMLSpanElement | null;

  fileInput?.addEventListener("change", function (event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (imageNameElement) {
      imageNameElement.textContent = file?.name ?? null;
    }
  });
  //end hiện password
  return (
    <div className="app">
      <div className="sliderighthome">
        <div className="row profileslideright" style={{ marginTop: "22%" }}>
          <div className="imgslideright">
            <img src={fi_editRef} alt="" className="imgprofileslideright" />
          </div>
          <p className="textprofileslideright">Quản lý phê duyệt</p>
        </div>
        <div
          className="row profileslideright"
          style={{ marginTop: "22%" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="imgslideright">
            <img src={fi_editRef} alt="" className="imgprofileslideright" />
          </div>
          <p className="textprofileslideright">Thêm bản ghi mới</p>
        </div>
        {/* popup */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                height: "624px",
                borderRadius: "16px",
                padding: "32px, 40px, 40px, 40px",
                background: "#3E3E5B",
              }}
            >
              <div className="modal-header">
                <h3
                  className=""
                  id="exampleModalLabel"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  Thêm bản ghi mới
                </h3>
              </div>
              <div className="modal-body">
                <form className="row">
                  <div className="col-md-12">
                    <label
                      htmlFor="tenbanghiupload"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      Tên bản ghi
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tenbanghiupload"
                      defaultValue="Mark"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="maisrcupload"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      Mã ISRC:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maisrcupload"
                      defaultValue="Otto"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="tacgiaupload"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      Tác giả:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tacgiaupload"
                      defaultValue="Otto"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="casiupload"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      Ca sĩ/ nhóm nhạc:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="casiupload"
                      defaultValue="Otto"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="validationDefault04"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      Thể loại
                    </label>
                    <select
                      className="form-select"
                      id="validationDefault04"
                      required
                    >
                      <option selected disabled>
                        Chọn một thể loại
                      </option>
                      <option>Rap</option>
                      <option>Ballad</option>
                      <option>Rock N Roll</option>
                      <option>R&B</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="nsxupload"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      Nhà sản xuất
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nsxupload"
                      required
                    />
                  </div>
                  <div className="col-6" style={{marginTop:"20px"}}>
                    Đính kèm bản ghi:
                    <div className="custom-file-label">
                      <input
                        type="file"
                        name=""
                        id="dinhkembanghi1"
                        className="custom-file-input"
                      />
                      <label htmlFor="dinhkembanghi1">Tải lên</label>
                    </div>
                  </div>
                  <div className="col-6"style={{marginTop:"20px"}}>
                    Đính kèm lời bài hát:
                    <div className="custom-file-label">
                      <input
                        type="file"
                        name=""
                        id="loibaihat1"
                        className="custom-file-input"
                      />
                      <label htmlFor="loibaihat1">Tải lên</label>
                    </div>
                  </div>
                  <div className="col-12 p-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      style={{
                        background: "none",
                        border: "1px solid #FF7506",
                        color: "#FF7506",
                        width: "168px",
                        height: "48px",
                        borderRadius: "8px",
                      }}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{
                        backgroundColor: "#FF7506",
                        color: "white",
                        width: "168px",
                        height: "48px",
                        borderRadius: "8px",
                        marginLeft: "10px",
                      }}
                    >
                      Tải lên
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
