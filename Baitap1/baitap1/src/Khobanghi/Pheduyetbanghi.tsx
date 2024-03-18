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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const auth = getAuth();

function Pheduyetbanghi() {
  //Lấy ảnh
  const [buttonrtolRef, setbuttonrtolUrl] = useState("");
  const [buttonltorRef, setbuttonltorUrl] = useState("");
  const [vdRef, setvdUrl] = useState("");

  useEffect(() => {
    const buttonltorRef = ref(storage, "icon/buttonltor.png");
    const buttonrtolRef = ref(storage, "icon/buttonrtol.png");
    const vdRef = ref(storage, "images/vd.png");

    Promise.all([
      getDownloadURL(buttonltorRef),
      getDownloadURL(vdRef),
      getDownloadURL(buttonrtolRef),
    ])
      .then((urls) => {
        setbuttonltorUrl(urls[0]);
        setvdUrl(urls[1]);
        setbuttonrtolUrl(urls[2]);
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

  //hieuung
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const tabBodies = document.querySelectorAll(".tab-slider--body");
    tabBodies.forEach((body) => {
      if (body.id === tabId) {
        (body as HTMLElement).style.display = "block";
      } else {
        (body as HTMLElement).style.display = "none";
      }
    });
  };
  //end
  return (
    <div className="app">
      <Topbar />
      <div className="displayflex">
        <div className="slidebar">
          <Sidebar />
        </div>

        <div className="main">
          <div className="row">
            <h1>Phê duyệt bản ghi</h1>
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
            style={{ width: "1500px", marginBottom: "10px" }}
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
            <div className="col-3 theloai"></div>
            <div className="col-2 theloai"></div>
            <div className="col-2 theloai iconhome">
              <FontAwesomeIcon
                icon={faList}
                className={`iconhomeicon  ${
                  activeTab === "tab1" ? "active" : ""
                }`}
                onClick={() => handleTabClick("tab1")}
              />
              <FontAwesomeIcon
                icon={faBorderAll}
                className={`iconhomeicon  ${
                  activeTab === "tab2" ? "active" : ""
                }`}
                onClick={() => handleTabClick("tab2")}
              />
            </div>
          </div>

          <div id="tab1" className="tab-slider--body">
            <div className="row sanpham" style={{ width: "1380px" }}>
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
                  <td width={"51px"}></td>
                  <td width={"96px"}>STT</td>
                  <td width={"292px"}>Tên bản ghi</td>
                  <td width={"200px"}>Ca sĩ</td>
                  <td width={"200px"}>Tác giả</td>
                  <td width={"183px"}>Mã ISRC</td>
                  <td width={"185px"}>Số hợp đồng</td>
                  <td width={"200px"}>Ngày tải</td>
                  <td width={"94px"}></td>
                </tr>
                <tr
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "13px",
                    lineHeight: "20px",
                    width: "100%",
                  }}
                >
                  <td width={"51px"}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="form-check-reverse"
                    />
                  </td>
                  <td width={"96px"} className="thuonghome">
                    1
                  </td>
                  <td width={"292px"}>
                    <p className="thuonghome">Mất em</p>
                    <p className="thuonghome1">Ballad Audio 3:21</p>
                  </td>
                  <td width={"200px"} className="thuonghome">
                    Phan Mạnh Quỳnh
                  </td>
                  <td width={"200px"} className="thuonghome">
                    Phan Mạnh Quỳnh
                  </td>
                  <td width={"183px"} className="thuonghome">
                  KRA40105463
                  </td>
                  <td width={"185px"} className="thuonghome">
                  HD20210524302
                  </td>
                  <td width={"200px"} className="thuonghome">
                  12/05/2021 16:46:12
                  </td>
                  <td width={"94px"}>
                    <a href="#" className="nghehome">
                      Nghe
                    </a>
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
          </div>

          <div id="tab2" className="tab-slider--body">
            <div className="row" style={{ width: "1380px" }}>
              <div className="col-3">
                <div
                  className="card"
                  style={{
                    width: "325px",
                    border: "none",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={vdRef}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "156px" }}
                  />
                  <div
                    className="card-body"
                    style={{
                      height: "165px",
                      backgroundColor: "rgb(49, 49, 73)",
                    }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        color: "white",
                        fontSize: "18px",
                        lineHeight: "17px",
                      }}
                    >
                      HỂGVREGERGeg ưewe
                    </h5>
                    <p className="card-text">
                      <p
                        style={{
                          color: "rgb(206, 206, 219)",
                          fontWeight: "700",
                          fontSize: "12px",
                          lineHeight: "10px",
                        }}
                      >
                        Ca sĩ:{" "}
                        <span
                          style={{
                            color: "rgb(206, 206, 219)",
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "10px",
                          }}
                        >
                          Bella Poarch
                        </span>
                      </p>

                      <p
                        style={{
                          color: "rgb(206, 206, 219)",
                          fontWeight: "700",
                          fontSize: "12px",
                          lineHeight: "10px",
                        }}
                      >
                        Sáng tác:{" "}
                        <span
                          style={{
                            color: "rgb(206, 206, 219)",
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "10px",
                          }}
                        >
                          Leilani Zulauf
                        </span>
                      </p>

                      <p
                        style={{
                          color: "rgb(206, 206, 219)",
                          fontWeight: "700",
                          fontSize: "12px",
                          lineHeight: "10px",
                        }}
                      >
                        Số hợp đồng:{" "}
                        <span
                          style={{
                            color: "rgb(206, 206, 219)",
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "10px",
                          }}
                        >
                          HD395738503
                        </span>
                      </p>
                    </p>

                    <div className="row">
                      <div
                        className="col-2"
                        style={{
                          height: "38px",
                          border: "1px solid rgb(114, 114, 136)",
                          borderRadius: "10px",
                          textAlign: "center",
                          marginLeft: "3px",
                        }}
                      >
                        <p
                          style={{
                            color: "rgb(114, 114, 136)",
                            fontSize: "8px",
                            lineHeight: "18px",
                            marginBottom: "0px",
                          }}
                        >
                          Thể loại
                        </p>
                        <p
                          style={{
                            color: "rgba(245, 245, 255, 1)",
                            fontSize: "11px",
                            fontWeight: "500",
                            marginTop: "0px",
                          }}
                        >
                          Pop
                        </p>
                      </div>

                      <div
                        className="col-2"
                        style={{
                          height: "38px",
                          border: "1px solid rgb(114, 114, 136)",
                          borderRadius: "10px",
                          textAlign: "center",
                          marginLeft: "3px",
                          width: "70px",
                        }}
                      >
                        <p
                          style={{
                            color: "rgb(114, 114, 136)",
                            fontSize: "8px",
                            lineHeight: "18px",
                            marginBottom: "0px",
                          }}
                        >
                          Định dạng
                        </p>
                        <p
                          style={{
                            color: "rgba(245, 245, 255, 1)",
                            fontSize: "11px",
                            fontWeight: "500",
                            marginTop: "0px",
                          }}
                        >
                          Audio
                        </p>
                      </div>

                      <div
                        className="col-2"
                        style={{
                          height: "38px",
                          border: "1px solid rgb(114, 114, 136)",
                          borderRadius: "10px",
                          textAlign: "center",
                          marginLeft: "3px",
                          width: "70px",
                        }}
                      >
                        <p
                          style={{
                            color: "rgb(114, 114, 136)",
                            fontSize: "8px",
                            lineHeight: "18px",
                            marginBottom: "0px",
                          }}
                        >
                          Thời lượng
                        </p>
                        <p
                          style={{
                            color: "rgba(245, 245, 255, 1)",
                            fontSize: "11px",
                            fontWeight: "500",
                            marginTop: "0px",
                          }}
                        >
                          03:00
                        </p>
                      </div>
                      <div className="col-4" style={{textAlign:"right"}}>
                      <input
                      type="checkbox"
                      name=""
                      id=""
                      className="form-check-reverse"
                      
                    />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
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

export default Pheduyetbanghi;
