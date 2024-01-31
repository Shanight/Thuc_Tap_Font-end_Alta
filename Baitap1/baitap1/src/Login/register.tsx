import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth, firebase, firestore, storage } from "../firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Topbar from "../slidebar/topbar";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle image file selection
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loginError1, setLoginError1] = useState(false);
  //chức năng nút đăng nhập, lấy dữ liệu từ firebase và đối chiếu với nó, nếu thành công thì sẽ đăng nhập
  const login1 = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const email = (document.getElementById("emaildn") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const firstname = (document.getElementById("firstname") as HTMLInputElement)
      .value;
    const lastname = (document.getElementById("lastname") as HTMLInputElement)
      .value;
    const phonenumber = (
      document.getElementById("phonenumber") as HTMLInputElement
    ).value;
    const birthday = (document.getElementById("birthday") as HTMLInputElement)
      .value;
    const imageuser = (document.getElementById("imageuser") as HTMLInputElement)
      .value;
    const role = (document.getElementById("role") as HTMLInputElement).value;

    if (email === "" && password === "") {
      setLoginError1(!loginError1);
      console.log("khongtenkomk");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (selectedImage) {
            const storage = getStorage();
            const storageRef = ref(
              storage,
              `images/${user.uid}/${selectedImage}`
            );

            uploadBytes(storageRef, selectedImage)
              .then(() => {
                console.log("Image uploaded successfully");

                // Get the download URL of the uploaded image
                getDownloadURL(storageRef)
                  .then((url) => {
                    // Registration successful
                    setDoc(doc(firestore, "users", user.uid), {
                      firstname: firstname,
                      lastname: lastname,
                      phonenumber: phonenumber,
                      birthday: birthday,
                      imageuser: url,
                      role: role,
                      email: email,
                    })
                      .then(() => {
                        console.log("Information saved to Firestore");
                      })
                      .catch((error) => {
                        console.error(
                          "Error saving information to Firestore: ",
                          error
                        );
                      });
                  })
                  .catch((error) => {
                    console.error("Error getting download URL: ", error);
                  });
              })
              .catch((error) => {
                console.error("Error uploading image: ", error);
              });
            // Registration successful
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Handle the error
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

  return (
    <div className="login">
      <Topbar />
      <div className="mainlogin">
        <img src={logoUrl} alt="" className="logo" />
        <h3 style={{ marginTop: "20px" }}>Đăng nhập</h3>
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
          <div className={`mb-3 ${loginError ? "" : ""}`}>
            <label htmlFor="firstname" className="form-label">
              Họ
            </label>
            <input
              type="text"
              className={`form-control ${loginError ? "has-error" : ""} ${
                loginError1 ? "has-error" : ""
              }`}
              id="firstname"
              aria-describedby="firstname"
            />
          </div>

          <div className={`mb-3 ${loginError ? "" : ""}`}>
            <label htmlFor="lastname" className="form-label">
              Tên
            </label>
            <input
              type="text"
              className={`form-control ${loginError ? "has-error" : ""} ${
                loginError1 ? "has-error" : ""
              }`}
              id="lastname"
              aria-describedby="lastname"
            />
          </div>

          <div className={`mb-3 ${loginError ? "" : ""}`}>
            <label htmlFor="phonenumber" className="form-label">
              Số điện thoại
            </label>
            <input
              type="tel"
              className={`form-control ${loginError ? "has-error" : ""} ${
                loginError1 ? "has-error" : ""
              }`}
              id="phonenumber"
              aria-describedby="phonenumber"
            />
          </div>

          <div className={`mb-3 ${loginError ? "" : ""}`}>
            <label htmlFor="birthday" className="form-label">
              Ngày sinh
            </label>
            <input
              type="date"
              className={`form-control ${loginError ? "has-error" : ""} ${
                loginError1 ? "has-error" : ""
              }`}
              id="birthday"
              aria-describedby="birthday"
            />
          </div>
          <div className={`mb-3 ${loginError ? "" : ""}`}>
            <label htmlFor="imageuser" className="form-label">
              Ảnh đại diện
            </label>
            <input
              type="file"
              className={`form-control ${loginError ? "has-error" : ""} ${
                loginError1 ? "has-error" : ""
              }`}
              id="imageuser"
              aria-describedby="imageuser"
              onChange={handleImageSelection} // Add the event listener to handle file selection
            />
          </div>
          <div className={`mb-3 ${loginError ? "" : ""}`}>
            <label htmlFor="role" className="form-label">
              Quyền
            </label>
            <input
              type="text"
              className={`form-control ${loginError ? "has-error" : ""} ${
                loginError1 ? "has-error" : ""
              }`}
              id="role"
              aria-describedby="role"
            />
          </div>
          <div className="loisaiten">
            {loginError ? (
              <div className={`${loginError1 ? "" : "displaynone"}`}>
                Sai tên đăng nhập hoặc mật khẩu
              </div>
            ) : (
              ""
            )}
            {loginError1 ? (
              <div className={`${loginError ? "displaynone" : ""}`}>
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
      </div>
    </div>
  );
};

export default Register;
