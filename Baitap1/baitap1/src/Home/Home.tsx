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
import { Input } from "antd";
const auth = getAuth();

function Home() {
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
              <Input
                className="form-control me-2 labelsearch bg-transparent focus:bg-transparent border-none hover:bg-transparent placeholder:text-[#727288] focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
                type="search"
                placeholder="Tên bản ghi, ca sĩ,..."
                aria-label="Search"
              />
              <button className="searchicon" type="button" style={{background:"none", border:"none", color:"white"}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
          <div className="row test1">
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
            <div className="col-2 theloai">
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
          <div className="row sanpham">
            <div className="sanphamchitiet">
              <tr style={{fontSize:"13px", lineHeight:"20px", fontWeight:"700", color:"#FFAC69", width:"100%"}}>
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
              <tr style={{fontFamily:"Montserrat",fontSize:"13px",lineHeight:"20px", width:"100%"}}>
                <td width={"5%"}>1</td>
                <td width={"13%"}>Mất em</td>
                <td width={"11%"}>KRA40105463</td>
                <td width={"8%"}>04:27</td>
                <td width={"11%"}>Phan Mạnh Quỳnh</td>
                <td width={"13%"}>Phan Mạnh Quỳnh</td>
                <td width={"8%"}>Ballad</td>
                <td width={"9%"}>Audio</td>
                <td width={"12%"}><span>Còn thời hạn</span> <p>02/10/2019</p></td>
                <td width={"8%"}><a href="/capnhat">Cập nhật</a></td>
                <td width={"9%"}><a href="/nghe">Nghe</a></td>
              </tr>
              
            </div>
          </div>

          <div>Welcome, {user ? user.email : ""}</div>
          <button onClick={handleSignOut}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
