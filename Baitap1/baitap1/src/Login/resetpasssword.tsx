import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase";
import Topbar from "../slidebar/topbar";
import { sendPasswordResetEmail } from "firebase/auth";

const Resetpass = () => {
  const handleResetPassword = () => {
    const email = (document.getElementById("emaildn") as HTMLInputElement)
      .value;
    console.log(email)
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
        <h3 style={{ marginTop: "20px" }}>Đổi mật khẩu</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="emaildn" className="form-label">
              Tên đăng nhập
            </label>
            <input
              type="email"
              className="form-control"
              id="emaildn"
              aria-describedby="emailHelp"
            />
          </div>

          <button className="button" onClick={handleResetPassword}>
            Gửi
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
