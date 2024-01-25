import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase";
import Topbar from "../slidebar/topbar";
import { sendPasswordResetEmail } from "firebase/auth";
import "./resetpass.css";

const Resetpass = () => {
  const handleResetPassword = () => {
    const email = (document.getElementById("emaildn") as HTMLInputElement)
      .value;
    console.log(email);
    sendPasswordResetEmail(auth, email);
  };

  // Lấy ảnh logo từ firebase
  const [logoUrl, setLogoUrl] = useState("");
  useEffect(() => {
    const logoRef = ref(storage, "images/logo.png");
    getDownloadURL(logoRef)
      .then((url) => {
        setLogoUrl(url);
      })
      .catch((error) => {
        console.log("Error getting logo URL:", error);
      });
  }, []);

  return (
    <div className="login">
      <Topbar />
      <div className="mainlogin">
        <img src={logoUrl} alt="" className="logo" />
        <h3
          style={{
            marginTop:"15px",
            fontFamily: "Montserrat",
            fontSize: "36px",
            fontWeight: "700",
            lineHeight: "48px",
            letterSpacing: "-0.002em",
          }}
        >
          Khôi phục mật khẩu
        </h3>
        <p style={{fontSize:"16px"}}>
          Vui lòng nhập địa chỉ email đã đăng ký để yêu cầu khôi phục mật khẩu
        </p>
        <form>
          <div className="mb-3">
            <label htmlFor="emaildn" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="emaildn"
              aria-describedby="emailHelp"
              style={{width:"100%"}}
            />
          </div>

          <button className="button" onClick={handleResetPassword}>
            Xác nhận
          </button>
        </form>
        <div className="bottom">
          <a href="../login" className="quenmk">
            Quay lại đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resetpass;
