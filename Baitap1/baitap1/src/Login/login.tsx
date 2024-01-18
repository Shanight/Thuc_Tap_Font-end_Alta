import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "./login.css";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { auth } from "../firebase";
import Home from "../Home/Home";

const Login = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  const login1 = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const email = (document.getElementById("emaildn") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Thành công");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Thất bại");
      });
  };
  

  return (
    <div className="login">
      <div className="slidebartop"></div>
      <div className="main">
        <img src={logo} alt="" className="logo" />
        <h3>Đăng nhập</h3>
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
            />
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
  );
};

export default Login;