import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import Rightbarhome from "./rightbarhome";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import "firebase/firestore";
const auth = getAuth();

function Home() {
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
            <h1>Kho bản ghi</h1>
          </div>
          <div className="row">
            <form className="d-flex mt-3 search" role="search">
              <input
                className="form-control me-2 labelsearch bg-transparent focus:bg-transparent border-none hover:bg-transparent placeholder:text-[#727288] focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
                type="search"
                placeholder="Tên bản ghi, ca sĩ,..."
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
          </div>
          <div
            className="row test1"
            style={{ width: "110%", marginBottom: "10px" }}
          >
            <div className="col-2 theloai">
              Thể loại:
              <div className="dropdown-center dropdownhome">
                <button
                  className="btn dropdown-toggle dropdownbutton"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "100%" }}
                >
                  Tất cả
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tất cả
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Còn thời hạn
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Hết hạn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2 theloai">
              Định dạng:
              <div className="dropdown-center dropdownhome">
                <button
                  className="btn dropdown-toggle dropdownbutton"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "100%" }}
                >
                  Tất cả
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tất cả
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Duyệt bởi người dùng
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Duyệt tự động
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 theloai">
              Thời hạn sử dụng:
              <div className="dropdown-center dropdownhome">
                <button
                  className="btn dropdown-toggle dropdownbutton"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "100%" }}
                >
                  Tất cả
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tất cả
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Pop
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      EDM
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ballad
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2 theloai">
              Trạng thái:
              <div className="dropdown-center dropdownhome">
                <button
                  className="btn dropdown-toggle dropdownbutton"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "100%" }}
                >
                  Tất cả
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tất cả
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Âm thanh
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Video
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2 theloai iconhome">
              <FontAwesomeIcon icon={faList} className="iconhomeicon" />
              <FontAwesomeIcon icon={faBorderAll} className="iconhomeicon" />
            </div>
          </div>
          <div className="row sanpham" style={{ width: "100%" }}>
            <div className="sanphamchitiet">
              <tr
                style={{
                  fontSize: "13px",
                  lineHeight: "30px",
                  fontWeight: "700",
                  color: "#FFAC69",
                  width: "100%",
                }}
              >
                <td width={"5%"}>STT</td>
                <td width={"13%"}>Tên bản ghi</td>
                <td width={"11%"}>Mã ISRC</td>
                <td width={"8%"}>Thời lượng</td>
                <td width={"11%"}>Ca sĩ</td>
                <td width={"13%"}>Tác giả</td>
                <td width={"8%"}>Thể loại</td>
                <td width={"9%"}>Định dạng</td>
                <td width={"12%"}>Thời hạn sử dụng</td>
                <td width={"8%"}></td>
                <td width={"9%"}></td>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>1</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>

              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
              </tr>
              <tr
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <td width={"5%"}>2</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}>
                  <span>Còn thời hạn</span> <p>02/10/2019</p>
                </td>
                <td width={"8%"}>
                  <a href="/capnhat">Cập nhật</a>
                </td>
                <td width={"9%"}>
                  <a href="/nghe">Nghe</a>
                </td>
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

          <div>Welcome, {user ? user.email : ""}</div>
          <button onClick={handleSignOut}>Đăng xuất</button>
        </div>
        <div className="slideright">
          <Rightbarhome />
        </div>
      </div>
    </div>
  );
}

export default Home;
