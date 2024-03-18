import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import Rightbarhome from "./rightbarhome";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import "firebase/firestore";
const auth = getAuth();

function Capnhatbanghi() {
  //Lấy ảnh
  const [buttonltorRef, setbuttonltorUrl] = useState("");
  const [vdRef, setvdUrl] = useState("");

  useEffect(() => {
    const buttonltorRef = ref(storage, "icon/buttonltor.png");
    const vdRef = ref(storage, "images/vd.png");

    Promise.all([getDownloadURL(buttonltorRef), getDownloadURL(vdRef)])
      .then((urls) => {
        setbuttonltorUrl(urls[0]);
        setvdUrl(urls[1]);
      })
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });
  }, []);

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

  function closeNav() {
    const mySidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");

    if (mySidenav && main) {
      mySidenav.style.width = "0";
      main.style.marginLeft = "0";
    }
  }

  function openNav() {
    const mySidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");

    if (mySidenav && main) {
      mySidenav.style.width = "140px";
      main.style.marginLeft = "140px";
    }
  }

  return (
    <div className="app">
      <Topbar />
      <div className="displayflex">
        <div className="slidebar">
        <div id="mySidenav" className="sidenav">
            <Sidebar />
            <p className="closebtn" onClick={closeNav}>
              Close
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: 30,
            minHeight: "100vh",
            cursor: "pointer",
            backgroundColor: "#020220",
            display: "flex",
            alignItems: "center",
            color: "rgba(255, 172, 105, 1)",
          }}
          onClick={openNav}
        >
          {">"}
        </p>
        <div className="main">
          <div className="row">
            <h1>Bản ghi - Mất em</h1>
          </div>

          <div
            className="test"
            style={{
              alignItems: "center",
              display: "flex",
              width: "1500px",
              justifyContent: "center",
            }}
          >
            <div
              className="row"
              style={{
                textAlign: "center",
                alignItems: "center",
                width: "1200px",
              }}
            >
              <div className="col-5" style={{}}>
                <div
                  className="row"
                  style={{
                    height: "476px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(43, 43, 63, 1)",
                  }}
                >
                  <p className="h1home">Thông tin bản ghi</p>
                  <div className="img">
                    <img src={vdRef} alt="" className="imgH" />
                  </div>
                  <p>Matren.mp3</p>
                  <div className="row">
                    <div
                      className="col-6"
                      style={{
                        textAlign: "left",
                        fontWeight: "700",
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      <p>Ngày thêm:</p>
                      <p>Người tải lên:</p>
                      <p>Người duyệt:</p>
                      <br />
                      <p>Ngày phê duyệt:</p>
                    </div>
                    <div
                      className="col-6"
                      style={{
                        textAlign: "right",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      <p>07/12/2023 - 17:43:32</p>
                      <p>Super Admin</p>
                      <p>Hệ thống (Tự động phê duyệt)</p>
                      <p>07/12/2023 - 17:43:32</p>
                    </div>
                  </div>
                </div>

                <div
                  className="row"
                  style={{
                    height: "258px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(43, 43, 63, 1)",
                    marginTop: "10px",
                  }}
                >
                  <div className="h1home">Thông tin ủy quyền</div>
                  <div className="row">
                    <div
                      className="col-6"
                      style={{
                        textAlign: "left",
                        fontWeight: "700",
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      <p>Số hợp đồng:</p>
                      <p>Ngày nhận ủy quyền:</p>
                      <p>Ngày hết hạn:</p>
                      <p>Trạng thái:</p>
                    </div>
                    <div
                      className="col-6"
                      style={{
                        textAlign: "right",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      <p>BH123</p>
                      <p>01/05/2021</p>
                      <p>01/08/2025</p>
                      <p>Còn thời hạn</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-7"
                style={{
                  height: "744px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(43, 43, 63, 1)",
                  width: "660px",
                  marginLeft: "12px",
                }}
              >
                <div className="h1home">Chỉnh sửa thông tin</div>
                <div className="form1" style={{}}>
                  <label
                    htmlFor="tenbanghi"
                    style={{
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Tên bản ghi
                  </label>
                  <input
                  id="tenbanghi"
                  name="tenbanghi"
                    type="text"
                    className="form-control"
                    style={{
                      border: "1px solid white",
                      color: "rgba(114, 114, 136, 1)",
                      backgroundColor: "rgba(51, 51, 77, 1)",
                      padding: "11px, 24px, 13px, 16px",
                    }}
                  />
                </div>

                <div className="form1" style={{}}>
                  <label
                    htmlFor="maisrc"
                    style={{
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Mã ISRC:
                  </label>
                  <input
                  name="maisrc"
                  id="maisrc"
                    type="text"
                    className="form-control"
                    style={{
                      border: "1px solid white",
                      color: "rgba(114, 114, 136, 1)",
                      backgroundColor: "rgba(51, 51, 77, 1)",
                      padding: "11px, 24px, 13px, 16px",
                    }}
                  />
                </div>

                <div className="form1" style={{}}>
                  <label
                    htmlFor="casi"
                    style={{
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Ca sĩ
                  </label>
                  <input
                  name="casi"
                  id="casi"
                    type="text"
                    className="form-control"
                    style={{
                      border: "1px solid white",
                      color: "rgba(114, 114, 136, 1)",
                      backgroundColor: "rgba(51, 51, 77, 1)",
                      padding: "11px, 24px, 13px, 16px",
                    }}
                  />
                </div>

                <div className="form1" style={{}}>
                  <label
                    htmlFor="tacgia"
                    style={{
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Tác giả
                  </label>
                  <input
                  id="tacgia"
                  name="tacgia"
                    type="text"
                    className="form-control"
                    style={{
                      border: "1px solid white",
                      color: "rgba(114, 114, 136, 1)",
                      backgroundColor: "rgba(51, 51, 77, 1)",
                      padding: "11px, 24px, 13px, 16px",
                    }}
                  />
                </div>

                <div className="form1" style={{}}>
                  <label
                    htmlFor="nhasanxuat"
                    style={{
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Nhà sản xuất
                  </label>
                  <input
                  name="nhasanxuat"
                  id="nhasanxuat"
                    type="text"
                    className="form-control"
                    style={{
                      border: "1px solid white",
                      color: "rgba(114, 114, 136, 1)",
                      backgroundColor: "rgba(51, 51, 77, 1)",
                      padding: "11px, 24px, 13px, 16px",
                    }}
                  />
                </div>

                <div className="form1" style={{}}>
                  <label
                    htmlFor="theloai"
                    style={{
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Thể loại
                  </label>
                  <select name="theloai" id="theloai"className="form-control"
                    style={{
                      border: "1px solid white",
                      color: "rgba(114, 114, 136, 1)",
                      backgroundColor: "rgba(51, 51, 77, 1)",
                      padding: "11px, 24px, 13px, 16px",
                    }}>
                  <option value="Ballad">Ballad</option>
                  <option value="Ballad">Ballad</option>
                  <option value="Ballad">Ballad</option>
                  </select>
                  
                </div>
              </div>
            </div>

            
            
          </div>

          <div className="row"  style={{marginBottom:"15px"}}>
              <div
                className="col"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <a
                  href="http://localhost:3000/"
                  style={{
                    paddingRight: "40px",
                  }}
                >
                  <input
                    type="button"
                    style={{
                      background: "none",
                      border: "1px solid #FF7506",
                      color: "#FF7506",
                      width: "168px",
                      height: "48px",
                      borderRadius: "8px",
                    }}
                    value={"Hủy"}
                  />
                </a>
                <input
                  type="button"
                  style={{
                    backgroundColor: "#FF7506",
                    color: "white",
                    width: "168px",
                    height: "48px",
                    borderRadius: "8px",
                  }}
                  value={"Lưu"}
                />
              </div>
            </div>
        </div>
        <div className="slideright">
          <Rightbarhome />
        </div>
      </div>
    </div>
  );
}

export default Capnhatbanghi;
