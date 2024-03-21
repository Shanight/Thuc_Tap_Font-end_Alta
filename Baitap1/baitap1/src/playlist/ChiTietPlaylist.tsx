import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import Rightbar from "./rightbar";
import "./style.css";
import Playlist from "./Playlist";
const auth = getAuth();

function ChiTietPlayList() {
  //Lấy ảnh
  const [buttonltorRef, setbuttonltorUrl] = useState("");
  const [buttonrtolRef, setbuttonrtolUrl] = useState("");
  const [vdRef, setvdUrl] = useState("");

  useEffect(() => {
    const buttonltorRef = ref(storage, "icon/buttonltor.png");
    const buttonrtolRef = ref(storage, "icon/buttonrtol.png");
    const vdRef = ref(storage, "images/vd.png");

    Promise.all([
      getDownloadURL(buttonltorRef),
      getDownloadURL(buttonrtolRef),
      getDownloadURL(vdRef),
    ])
      .then((urls) => {
        setbuttonltorUrl(urls[0]);
        setbuttonrtolUrl(urls[1]);
        setvdUrl(urls[2]);
      })
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  const [sohopdong, setSohopdong] = useState();
  const [tenhopdong, setTenhopdong] = useState();
  const [ngayhieuluc, setNgayhieuluc] = useState();
  const [ngayhethan, setNgayhethan] = useState();
  const [quyentacgia, setquyentacgia] = useState();
  const [quyennguoibieudien, setquyennguoibieudien] = useState();
  const [quyennhasanxuat, setquyennhasanxuat] = useState();
  const [phapnhanuyquyen, setphapnhanuyquyen] = useState();
  const [tennguoiuyquyen, settennguoiuyquyen] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [quoctich, setquoctich] = useState();
  const [sodienthoai, setsodienthoai] = useState();
  const [socccd, setsocccd] = useState();
  const [ngaycap, setngaycap] = useState();
  const [noicap, setnoicap] = useState();
  const [masothue, setmasothue] = useState();
  const [noicutru, setnoicutru] = useState();
  const [email, setemail] = useState();
  const [sotaikhoan, setsotaikhoan] = useState();
  const [nganhang, setnganhang] = useState();

  const [Casi, setcasi] = useState();
  const [MaISRC, setmaisrc] = useState();
  const [ngaytai, setngaytai] = useState();
  const [tacgia, settacgia] = useState();
  const [tenbanghi, settenbanghi] = useState();
  const [tinhtrang, settinhtrang] = useState();
  const [filteredData, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchDuLieuBaiHat = async () => {
      try {
        if (!id) {
          console.log("ID not found!");
          return;
        }

        const baiHatRef = doc(firestore, "BaiHat", id);
        const docSnap = await getDoc(baiHatRef);

        if (docSnap.exists()) {
          const duLieuBaiHat = docSnap.data();
          console.log(duLieuBaiHat.CaSi);
          // Thực hiện các xử lý khác với dữ liệu bài hát
        }
      } catch (error) {
        console.error("Error fetching bai hat information: ", error);
      }
    };
    fetchDuLieuBaiHat();

    const fetchData = async () => {
      try {
        if (!id) {
          console.log("ID not found!");
          return;
        }

        const querySnapshot = await getDocs(collection(firestore, "BaiHat"));
        const filteredData: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.data().idhopdong === id) {
            filteredData.push(doc.data());
          } else {
            console.log("Thất bại");
          }
        });

        setData(filteredData);

        const quanlyRef = doc(firestore, "quanlyhopdong", id);
        const docSnap = await getDoc(quanlyRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSohopdong(data.sohopdong);
          setTenhopdong(data.tenhopdong);
          setNgayhieuluc(data.ngayhieuluc);
          setNgayhethan(data.ngayhethan);
          setquyentacgia(data.quyentacgia);
          setquyennguoibieudien(data.quyennguoibieudien);
          setquyennhasanxuat(data.quyennhasanxuat);
          setphapnhanuyquyen(data.phapnhanuyquyen);
          settennguoiuyquyen(data.tennguoiuyquyen);
          setngaysinh(data.ngaysinh);
          setgioitinh(data.gioitinh);
          setquoctich(data.quyennhasanxuat);
          setsodienthoai(data.sodienthoai);
          setsocccd(data.socccd);
          setngaycap(data.ngaycap);
          setnoicap(data.noicap);
          setmasothue(data.masothue);
          setnoicutru(data.noicutru);
          setemail(data.email);
          setsotaikhoan(data.sotaikhoan);
          setnganhang(data.nganhang);

          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
      } else {
        // Người dùng đã đăng xuất
        navigate("/login"); // Chuyển hướng đến trang "Login"
      }
    });

    //HIệu ứng chuyển slide
    const tabBodies = document.querySelectorAll(".tab-slider--body");
    tabBodies.forEach((body, index) => {
      if (index === 0) {
        (body as HTMLElement).style.display = "block";
      } else {
        (body as HTMLElement).style.display = "none";
      }
    });
    //end

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
        <div className="main" id="main" style={{ width: "82%" }}>
          <div className="row">
            <p style={{ color: "#FFAC69" }}>
              <a
                href="http://localhost:3000/playlist"
                style={{ color: "#F5F5FF", textDecoration: "none" }}
              >
                Playlist{" "}
              </a>
              {">"}{" "}
              <a href="" style={{ color: "#F5F5FF", textDecoration: "none" }}>
                Chi tiết Playlist
              </a>
            </p>
          </div>
          <div className="row">
            <h1>Playlist Top ca khúc 2021</h1>
          </div>
          <div className="row" style={{ width: "1670px", marginTop: "15px" }}>
            {/* main */}
            <div className="col" style={{ width: "240px", marginTop: "10px" }}>
              <img
                src={vdRef}
                alt=""
                style={{ height: "274px", width: "274px", borderRadius: "9px" }}
              />
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "24px",
                  marginTop: "10px",
                }}
              >
                Top ca khúc 2021
              </p>
              <hr />
              <div className="row">
                <div className="col-6">
                  <p>Người tạo:</p>
                  <p>Tổng số:</p>
                  <p>Tổng thời lượng:</p>
                </div>
                <div className="col-6">
                  <p>Super Admin</p>
                  <p>8 bản ghi</p>
                  <p>01:31:16</p>
                </div>
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt labore et dolore magna aliqua.
              </p>
              <hr />
              <div className="row">
                <div className="col-4">Chủ đề 1</div>
                <div className="col-4">Chủ đề 2</div>
                <div className="col-4">Chủ đề 3</div>
                <div className="col-4">Chủ đề 4</div>
                <div className="col-4">Chủ đề 5</div>
                <div className="col-4">Chủ đề 6</div>
              </div>
              <hr />
              <p>Hiển thị ở chế độ công khai</p>
              <p>Phát ngẫu nhiên</p>
              <p>Lập lại</p>
            </div>

            <div className="col" style={{}}>
              <div
                className="sanpham"
                style={{
                  width: "1344px",
                  marginBottom: "30px",
                  minHeight:"700px"
                }}
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
                    <td width={"121px"} style={{ textAlign: "center" }}>
                      STT
                    </td>
                    <td width={"364px"}>Tên bản ghi</td>
                    <td width={"355px"} style={{  }}>
                      Ca sĩ
                    </td>
                    <td width={"265px"} style={{  }}>
                      Tác giả
                    </td>
                    <td width={"0px"} style={{ }}></td>
                    <td width={"20px"}></td>
                  </tr>

                  <tr
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "13px",
                      lineHeight: "50px",
                      width: "100%",
                    }}
                  >
                    <td width={"121px"} style={{ textAlign: "center" }}>
                      1
                    </td>
                    <td width={"364px"}>Gorgeous Wooden Bike</td>
                    <td width={"355px"} style={{}}>
                    Tăng Phúc ft Mỹ Lệ
                    </td>
                    <td width={"265px"} style={{}}>
                    Origin
                    </td>
                    <a href="#" style={{ color: "#FF7506" }}>
                      <td width={"60px"} style={{  }}>Nghe</td>
                    </a>
                    <a href="#" style={{ color: "#FF7506" }}>
                      <td width={"20px"}>Gỡ</td>
                    </a>
                  </tr>
                </div>
                <div className="sanphamchitiet" style={{ width:"1344px",position: "absolute", bottom: "0" }}>
                  <tr
                    style={{
                      fontSize: "13px",
                      lineHeight: "30px",
                      fontWeight: "700",
                      color: "#FFAC69",
                      width: "100%",
                    }}
                    className=""
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
          </div>
        </div>
        <div className="slideright">
          <Rightbar />
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </div>
  );
}

export default ChiTietPlayList;
