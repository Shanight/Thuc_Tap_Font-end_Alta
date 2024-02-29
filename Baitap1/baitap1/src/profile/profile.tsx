import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "../firebase";
import "firebase/firestore";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import firebase from "firebase/app";

const auth = getAuth();

function Profile() {
  const [cameraRef, setCameraUrl] = useState("");
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
        setCameraUrl(urls[0]);
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

  //lấy dữ liệu người dùng
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user information: ", error);
      }
    };

    //kết thúc lấy dữ liệu người dùng

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
        fetchUserInfo();
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
    <div className="main">
      <div className="row">
        <h1 className="tieude">Thông tin cơ bản</h1>
      </div>

      <div className="row thongtinchitietprofile">
        <div className="col-6">
          <img src={userInfo?.imageuser} alt="" className="profileimage" />
          <div className="backgroupprofileimage2">
            <img src={cameraRef} alt="" className="profileimage2" />
          </div>

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
            {userInfo?.lastname} {userInfo?.firstname}
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
                value={userInfo?.firstname}
                disabled
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
                value={userInfo?.lastname}
                disabled
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
                value={userInfo?.birthday}
                disabled
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
                value={userInfo?.phonenumber}
                disabled
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
                value={userInfo?.email}
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
                value={userInfo?.email}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputZip" className="form-label">
                Phân quyền
              </label>
              <input
                type="text"
                className="form-control profile disabledprofile"
                id="inputZip"
                disabled
                value={userInfo?.role}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
