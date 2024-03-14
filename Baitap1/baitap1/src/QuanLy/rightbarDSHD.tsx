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
import { storage } from "../firebase";
import "firebase/firestore";
import "../Khobanghi/Home.css";
const auth = getAuth();

function RightbarDSHD() {
  const [fi_log_outRef, setfi_log_outUrl] = useState("");
  const [PadlockRef, setPadlockUrl] = useState("");
  const [fi_editRef, setfi_editUrl] = useState("");
  const [VectorRef, setVectorUrl] = useState("");

  useEffect(() => {
    //Lấy ảnh
    const cameraRef = ref(storage, "icon/fi_camera.png");
    const fi_log_outRef = ref(storage, "icon/fi_log-out.png");
    const PadlockRef = ref(storage, "icon/Padlock.png");
    const fi_editRef = ref(storage, "icon/fi_edit.png");
    const VectorRef = ref(storage, "icon/Vector.png");

    Promise.all([
      getDownloadURL(cameraRef),
      getDownloadURL(fi_log_outRef),
      getDownloadURL(PadlockRef),
      getDownloadURL(fi_editRef),
      getDownloadURL(VectorRef),
    ])
      .then((urls) => {
        setfi_log_outUrl(urls[1]);
        setPadlockUrl(urls[2]);
        setfi_editUrl(urls[3]);
        setVectorUrl(urls[4]);
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
  //end hiện password
  return (
    <div className="app">
      <div className="sliderighthome">
      <a href="../quanlyhopdong/create" style={{textDecoration:"none"}}>
        <div className="row profileslideright" style={{ marginTop: "22%" }}>
          <div className="imgslideright">
            <img src={VectorRef} alt="" className="imgprofileslideright" />
          </div>
          <p className="textprofileslideright">Thêm hợp đồng</p>
         
        </div>
        </a>
      </div>
    </div>
  );
}

export default RightbarDSHD;
