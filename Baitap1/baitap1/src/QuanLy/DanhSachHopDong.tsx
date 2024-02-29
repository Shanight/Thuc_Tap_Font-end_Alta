import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DanhSachHopDong.css";
import Sidebar from "../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../slidebar/topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "../firebase";
import {
  DocumentData,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import RightbarDSHD from "./rightbarDSHD";
import { Link } from "react-router-dom";

const auth = getAuth();

function DanhSachHopDong() {
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
  //Lấy nhiều dữ liệu
  const [data, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quanlyRef = await getDocs(collection(firestore, "quanlyhopdong"));
        const fetchedData: DocumentData[] = [];

        quanlyRef.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        setData(fetchedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
    // end nhiều dữ liệu

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
            <h1>Danh sách hợp đồng</h1>
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
              Quyền sở hữu:
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
              Hiệu lực hợp đồng:
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
            <div className="col-4"></div>
            <div className="col-2">
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
          </div>
          <div className="row sanpham" style={{ width: "1441px" }}>
            <div className="sanphamchitiet">
              <table>
                <thead style={{lineHeight:"60px"}}>
                  <tr
                    style={{
                      fontSize: "13px",
                      lineHeight: "50px",
                      fontWeight: "700",
                      color: "#FFAC69",
                    }}
                  >
                    <th>STT</th>
                    <th>Số hợp đồng</th>
                    <th>Tên hợp đồng</th>
                    <th>Người ủy quyền</th>
                    <th>Quyền sở hữu</th>
                    <th>Hiệu lực hợp đồng</th>
                    <th>Ngày tạo</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "13px",
                        lineHeight: "30px",
                      }}
                    >
                      <td width={"7%"}>{index + 1}</td>
                      <td width={"13%"}>{item.sohopdong}</td>
                      <td width={"25%"}>{item.tenhopdong}</td>
                      <td width={"13%"}>{item.tennguoiuyquyen}</td>
                      <td width={"13%"}>{item.quyensohuu}</td>
                      <td width={"12%"}>{item.ngayhethan}</td>
                      <td width={"8%"}>{item.ngayhieuluc}</td>
                      <td width={"8%"} >
                        <Link to={`/quanlyhopdong/chitiet/${item.id}`} style={{ color: "#FF7506" }}>Xem chi tiết</Link>
                      </td>
                      <td width={"9%"}>
                        <a href="/" style={{ color: "#FF7506" }}>Nghe</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          <RightbarDSHD />
        </div>
      </div>
    </div>
  );
}

export default DanhSachHopDong;
function setData(fetchedData: DocumentData[]) {
  throw new Error("Function not implemented.");
}
