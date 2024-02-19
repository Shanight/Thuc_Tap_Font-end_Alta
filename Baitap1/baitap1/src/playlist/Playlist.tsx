import { useNavigate } from "react-router-dom";
import "./Playlist.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import Rightbarhome from "./rightbarplaylist";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import "firebase/firestore";

const auth = getAuth();

function Playlist() {
  //Lấy ảnh
  const [buttonltorRef, setbuttonltorUrl] = useState("");
  const [buttonrtolRef, setbuttonrtolUrl] = useState("");

  useEffect(() => {
    const buttonltorRef = ref(storage, "icon/buttonltor.png");
    const buttonrtolRef = ref(storage, "icon/buttonrtol.png");

    Promise.all([getDownloadURL(buttonltorRef), getDownloadURL(buttonrtolRef)])
      .then((urls) => {
        setbuttonltorUrl(urls[0]);
        setbuttonrtolUrl(urls[1]);
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
    <div className="app">
      <Topbar />
      <div className="displayflex">
        <div className="slidebar">
          <Sidebar />
        </div>
        <div className="main">
          <div className="row">
            <h1>Playlist</h1>
          </div>
          <div className="row">
            <form className="d-flex mt-3 search" role="search">
              <input
                className="form-control me-2 labelsearch bg-transparent focus:bg-transparent border-none hover:bg-transparent placeholder:text-[#727288] focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
                type="search"
                placeholder="Tên chủ đề, người tạo..."
                aria-label="Search"
              />
              <button
                className="searchicon"
                type="button"
                style={{ background: "none", border: "none", color: "white" }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <div
              className="col-2 theloai iconhome"
              style={{ marginLeft: "800px" }}
            >
              <FontAwesomeIcon icon={faList} className="iconhomeicon" />
              <FontAwesomeIcon icon={faBorderAll} className="iconhomeicon" />
            </div>
          </div>

          <div
            className="row sanpham"
            style={{ width: "1441px", marginTop: "20px", marginBottom: "30px" }}
          >
            <div className="sanphamchitiet">
              <tr
                style={{
                  fontSize: "13px",
                  lineHeight: "40px",
                  fontWeight: "700",
                  color: "#FFAC59",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  STT
                </td>
                <td width={"23%"}>Tiêu đề</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  Số bản ghi
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  Thời lượng
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Chủ đề
                </td>
                <td width={"11%"}>Ngày tạo</td>
                <td width={"10%"}>Người tạo</td>
                <td width={"9%"}></td>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "50px",
                  width: "100%",
                }}
              >
                <td width={"5%"} style={{ textAlign: "center" }}>
                  1
                </td>
                <td width={"23%"}>Top ca khúc 2023</td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  15
                </td>
                <td width={"11%"} style={{ textAlign: "right" }}>
                  02:34:40
                </td>
                <td width={"26%"} style={{ paddingLeft: "30px" }}>
                  Cop, Chill, Dingga
                </td>
                <td width={"11%"}>19/02/2024</td>
                <td width={"10%"}>Cindy Cường</td>
                <a href="#" style={{ color: "#FF7506" }}>
                  <td width={"9%"}>Chi tiết</td>
                </a>
              </tr>
            </div>
            <div className="sanphamchitiet" style={{ minHeight: "50px" }}>
              <tr
                style={{
                  fontSize: "13px",
                  lineHeight: "30px",
                  fontWeight: "700",
                  color: "#FFAC69",
                  width: "100%",
                }}
              >
                <td width={"18%"}>
                  Hiển thị{" "}
                  <input
                    type="number"
                    style={{
                      background:
                        "linear-gradient(0deg, #2B2B3F, #2B2B3F),linear-gradient(0deg, #FF7506, #FF7506)",
                      width: "48.37px",
                      height: "32px",
                      padding: "6px, 16.19px, 5px, 16.19px",
                      borderRadius: "4px",
                      border: "1px solid #FF7506",
                      color: "white",
                      textAlign: "center",
                    }}
                    min={10}
                    max={20}
                    defaultValue={10}
                  />
                  hàng trong mỗi trang
                </td>
                <td width={"48%"}></td>
                <td width={"10%"}>
                  <nav aria-label="...">
                    <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="1"
                          style={{ background: "none", border: "none" }}
                        >
                          <img src={buttonrtolRef} alt="" />{" "}
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="1"
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgb(245 245 254 / 56%)",
                          }}
                        >
                          1
                        </a>
                      </li>
                      <li className="page-item" aria-current="page">
                        <a
                          className="page-link"
                          href="#"
                          style={{
                            backgroundColor: "#FF750680",
                            border: "none",
                            color: "#F5F5FF",
                            borderRadius: "50px",
                            height: "40px",
                            width: "40px",
                            textAlign: "center",
                          }}
                        >
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgb(245 245 254 / 56%)",
                          }}
                        >
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link disabled"
                          href="#"
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgb(245 245 254 / 56%)",
                          }}
                        >
                          ...
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgb(245 245 254 / 56%)",
                          }}
                        >
                          100
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          style={{ background: "none", border: "none" }}
                        >
                          <img src={buttonltorRef} alt="" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </td>
              </tr>
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

export default Playlist;
