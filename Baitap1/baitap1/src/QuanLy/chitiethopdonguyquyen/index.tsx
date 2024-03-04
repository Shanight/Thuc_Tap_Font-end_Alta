import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../../slidebar/topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase";
import {
  DocumentData,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import Rightbar from "./rightbar";
import "./style.css";
const auth = getAuth();

function Chitiethopdonguyquyen() {
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
        <div className="main" style={{ width: "82%" }}>
          <div className="row">
            <p style={{ color: "#FFAC69" }}>
              <a
                href="http://localhost:3000/quanlyhopdong"
                style={{ color: "#F5F5FF", textDecoration: "none" }}
              >
                Quản lý{" "}
              </a>
              {">"}{" "}
              <a
                href="http://localhost:3000/quanlyhopdong"
                style={{ color: "#F5F5FF", textDecoration: "none" }}
              >
                Quản lý hợp đồng
              </a>{" "}
              {">"} <span style={{ color: "#F5F5FF" }}>Chi tiết</span>
            </p>
          </div>
          <div className="row">
            <h1>Chi tiết hợp đồng ủy quyền</h1>
          </div>
          <div className="row">
            <div>
              <div className="tab-slider--nav">
                <ul className="tab-slider--tabs">
                  <li
                    className={`tab-slider--trigger ${
                      activeTab === "tab1" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab1")}
                    rel="tab1"
                  >
                    Thông tin hợp đồng
                  </li>
                  <li
                    className={`tab-slider--trigger ${
                      activeTab === "tab2" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab2")}
                    rel="tab2"
                  >
                    Tác phẩm ủy quyền
                  </li>
                </ul>
              </div>
              <div className="tab-slider--container">
                {/*TAB 1*/}
                <div id="tab1" className="tab-slider--body">
                  <div className="row" style={{}}>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-3 chudau1">
                          <p>Số hợp đồng:</p>
                          <p>Tên hợp đồng:</p>
                          <p>Ngày hiệu lực:</p>
                          <p>Ngày hết hạn:</p>
                          <p>Tình trạng:</p>
                        </div>
                        <div className="col chucuoi1">
                          {sohopdong !== "" ? (
                            <p>{sohopdong}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                            </>
                          )}
                          {tenhopdong !== "" ? (
                            <p>{tenhopdong}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                            </>
                          )}
                          {ngayhieuluc !== "" ? (
                            <p>{ngayhieuluc}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                            </>
                          )}
                          {ngayhethan !== "" ? (
                            <p>{ngayhethan}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                            </>
                          )}
                          <p>Còn thời hạn</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col-3 chudau1">
                          <p>Đính kèm tệp:</p>
                        </div>
                        <div className="col chucuoi1">
                          <p>Hetthuongmetnho.mp3</p>
                          <p>test2.doc</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col-6 chudau1">
                          <p>Mức nhuận bút:</p>
                          <p>Quyền tác giả:</p>
                          <p>Quyền liên quan:</p>
                          <p>Quyền của người biểu diễn:</p>
                          <p>Quyền của nhà sản xuất {"(Bản ghi/video)"}:</p>
                        </div>
                        <div className="col chucuoi1">
                          {quyentacgia !== "" ? (
                            <p>{quyentacgia}%</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {quyentacgia}%
                            </>
                          )}
                          <p>
                            <br />
                            <p />
                          </p>
                          {quyennguoibieudien !== "" ? (
                            <p>{quyennguoibieudien}%</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {quyennguoibieudien}%
                            </>
                          )}
                          <p>{quyennhasanxuat}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "30px" }}>
                    <p>Thông tin pháp nhân ủy quyền:</p>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-4 chudau1">
                          <p>Pháp nhân ủy quyền:</p>
                          <p>Tên người ủy quyền:</p>
                          <p>Ngày sinh:</p>
                          <p>Giới tính:</p>
                          <p>Quốc tịch:</p>
                          <p>Số điện thoại:</p>
                        </div>
                        <div className="col chucuoi1">
                          {phapnhanuyquyen !== "" ? (
                            <p>{phapnhanuyquyen}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {phapnhanuyquyen}
                            </>
                          )}
                          {tennguoiuyquyen !== "" ? (
                            <p>{tennguoiuyquyen}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {tennguoiuyquyen}
                            </>
                          )}
                          {ngaysinh !== "" ? (
                            <p>{ngaysinh}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {ngaysinh}
                            </>
                          )}
                          {gioitinh !== "" ? (
                            <p>{gioitinh}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {gioitinh}
                            </>
                          )}
                          {quoctich !== "" ? (
                            <p>{quoctich}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {quoctich}
                            </>
                          )}
                          {sodienthoai !== "" ? (
                            <p>{sodienthoai}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {sodienthoai}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col-4 chudau1">
                          <p>Số CMND/CCCD:</p>
                          <p>Ngày cấp:</p>
                          <p>Nơi cấp:</p>
                          <p>Mã số thuế:</p>
                          <p>Nơi cư chú:</p>
                        </div>
                        <div className="col chucuoi1">
                          {socccd !== "" ? (
                            <p>{socccd}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {socccd}
                            </>
                          )}
                          {ngaycap !== "" ? (
                            <p>{ngaycap}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {ngaycap}
                            </>
                          )}
                          {noicap !== "" ? (
                            <p>{noicap}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {noicap}
                            </>
                          )}
                          {masothue !== "" ? (
                            <p>{masothue}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {masothue}
                            </>
                          )}
                          {noicutru !== "" ? (
                            <p>{noicutru}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {noicutru}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col-6 chudau1">
                          <p>Email:</p>
                          <p>Tài khoản đăng nhập:</p>
                          <p>Mật khẩu:</p>
                          <p>Số tài khoản:</p>
                          <p>Ngân hàng:</p>
                        </div>
                        <div className="col chucuoi1">
                          {email !== "" ? (
                            <p>{email}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {email}
                            </>
                          )}
                          {email !== "" ? (
                            <p>{email}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {email}
                            </>
                          )}
                          <p>************</p>
                          {sotaikhoan !== "" ? (
                            <p>{sotaikhoan}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {sotaikhoan}
                            </>
                          )}
                          {nganhang !== "" ? (
                            <p>{nganhang}</p>
                          ) : (
                            <>
                              <br />
                              <p />
                              {nganhang}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*TAB 2*/}
                <div id="tab2" className="tab-slider--body">
                  <div
            className="row test1"
            style={{ width: "110%", marginBottom: "10px" }}
          >
            <div className="col-2 theloai">
              Tình trạng phê duyệt:
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
                    <td width={"100px"}>STT</td>
                    <td width={"100px"}>Tên bản ghi</td>
                    <td width={"15%"}>Mã ISRC</td>
                    <td width={"14%"}>Ca sĩ</td>
                    <td width={"14%"}>Tác giả</td>
                    <td width={"13%"}>Ngày tải</td>
                    <td width={"10%"}>Tình trạng</td>
                    <td width={"9%"}></td>
                  </tr>
                </thead>
                <tbody>
                
                  {filteredData.map((data,index) => (
                    <tr
                      key={index}
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "13px",
                        lineHeight: "30px",
                      }}
                    >
                      <td >{index + 1}</td>
                      <td width={"25%"}>{data.TenBanGhi}</td>
                      <td width={"15%"}>{data.MaISRC}</td>
                      <td width={"14%"}>{data.CaSi}</td>
                      <td width={"14%"}>{data.TacGia}</td>
                      <td width={"13%"}>{data.NgayTai}</td>
                      <td width={"10%"}>{data.TinhTrang}</td>
                      <td width={"9%"} >
                        <Link to={`#`} style={{ color: "#FF7506" }}>Nghe</Link>
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

export default Chitiethopdonguyquyen;
function setData(fetchedData: DocumentData[]) {
  throw new Error("Function not implemented.");
}
