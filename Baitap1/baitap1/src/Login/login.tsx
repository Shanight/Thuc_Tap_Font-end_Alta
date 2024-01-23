import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Topbar from "../slidebar/topbar";
import { getDownloadURL, ref } from "firebase/storage";

const Login = () => {
  const navigate = useNavigate();
  //chức năng nút đăng nhập, lấy dữ liệu từ firebase và đối chiếu với nó, nếu thành công thì sẽ đăng nhập
  const login1 = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const email = (document.getElementById("emaildn") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    if (email == "" && password == "") {
      setLoginError1(!loginError1);
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoginError(false);
          navigate("/");
          console.log("Thành công");
        })
        .catch((error) => {
          const loginError = false;
          setLoginError(!loginError);
        });
    }
  };
  //end đăng nhập

  //hiện password đã nhập
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  //end hiện password

  //Lấy ảnh logo từ firebase
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
  //end lấy ảnh
  const [loginError, setLoginError] = useState(false);
  const [loginError1, setLoginError1] = useState(false);

  return (
    <div>
      <Topbar />
      <div className="login">
        <div className="slidebartop"></div>
        <div className="main">
          <img src={logoUrl} alt="" className="logo" />
          <h3>Đăng nhập</h3>
          <form>
            <div className={`mb-3 ${loginError ? "" : ""}`}>
              <label htmlFor="emaildn" className="form-label">
                Tên đăng nhập
              </label>
              <input
                type="email"
                className={`form-control ${loginError ? "has-error" : ""} ${
                  loginError1 ? "has-error" : ""
                }`}
                id="emaildn"
                aria-describedby="emailHelp"
              />
            </div>

            <div className={`mb-3 ${loginError ? "" : ""}`}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div
                className={`input-group ${loginError ? "has-error" : ""} ${
                  loginError1 ? "has-error" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control`}
                  id="password"
                />
                <button
                  className="eye"
                  type="button"
                  onClick={handleTogglePassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div className="loisaiten">
              {loginError ? (
                <div className={`${loginError1 ? "displaynone" : ""}`}>
                  Sai tên đăng nhập hoặc mật khẩu
                </div>
              ) : (
                ""
              )}
              {loginError1 ? (
                <div className={`${loginError ? "" : "displaynone"}`}>
                  Vui lòng nhập tên đăng nhập và mật khẩu
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <button className="button" onClick={login1}>
              Đăng nhập
            </button>
          </form>
          <div className="bottom">
            <a href="../" className="quenmk">
              Quên mật khẩu?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
