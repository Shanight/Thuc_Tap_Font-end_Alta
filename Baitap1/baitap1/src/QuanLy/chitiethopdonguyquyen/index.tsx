import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          console.log("ID not found!");
          return;
        }

        const quanlyRef = doc(firestore, "quanlyhopdong", id);
        const docSnap = await getDoc(quanlyRef);
        const fetchedData: DocumentData[] = [];

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
                          {sohopdong !== "" ? <p>{sohopdong}</p> : <><br /><p /></>}
                          {tenhopdong !== "" ? <p>{tenhopdong}</p> : <><br /><p /></>}
                          {ngayhieuluc !== "" ? <p>{ngayhieuluc}</p> : <><br /><p /></>}
                          {ngayhethan !== "" ? <p>{ngayhethan}</p> : <><br /><p /></>}
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
                              <br /><p />
                              {quyentacgia}%
                            </>
                          )}
                          <p>
                            <br /><p />
                          </p>
                          {quyennguoibieudien !== "" ? (
                            <p>{quyennguoibieudien}%</p>
                          ) : (
                            <>
                              <br /><p />
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
                              <br /><p />
                              {phapnhanuyquyen}
                            </>
                          )}
                          {tennguoiuyquyen !== "" ? (
                            <p>{tennguoiuyquyen}</p>
                          ) : (
                            <>
                              <br /><p />
                              {tennguoiuyquyen}
                            </>
                          )}
                          {ngaysinh !== "" ? (
                            <p>{ngaysinh}</p>
                          ) : (
                            <>
                              <br /><p />
                              {ngaysinh}
                            </>
                          )}
                          {gioitinh !== "" ? (
                            <p>{gioitinh}</p>
                          ) : (
                            <>
                              <br /><p />
                              {gioitinh}
                            </>
                          )}
                          {quoctich !== "" ? (
                            <p>{quoctich}</p>
                          ) : (
                            <>
                              <br /><p />
                              {quoctich}
                            </>
                          )}
                          {sodienthoai !== "" ? (
                            <p>{sodienthoai}</p>
                          ) : (
                            <>
                              <br /><p />
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
                              <br /><p />
                              {socccd}
                            </>
                          )}
                          {ngaycap !== "" ? (
                            <p>{ngaycap}</p>
                          ) : (
                            <>
                              <br /><p />
                              {ngaycap}
                            </>
                          )}
                          {noicap !== "" ? (
                            <p>{noicap}</p>
                          ) : (
                            <>
                              <br /><p />
                              {noicap}
                            </>
                          )}
                          {masothue !== "" ? (
                            <p>{masothue}</p>
                          ) : (
                            <>
                              <br /><p />
                              {masothue}
                            </>
                          )}
                          {noicutru !== "" ? (
                            <p>{noicutru}</p>
                          ) : (
                            <>
                              <br /><p />
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
                              <br /><p />
                              {email}
                            </>
                          )}
                          {email !== "" ? (
                            <p>{email}</p>
                          ) : (
                            <>
                              <br /><p />
                              {email}
                            </>
                          )}
                          <p>************</p>
                          {sotaikhoan !== "" ? (
                            <p>{sotaikhoan}</p>
                          ) : (
                            <>
                              <br /><p />
                              {sotaikhoan}
                            </>
                          )}
                          {nganhang !== "" ? (
                            <p>{nganhang}</p>
                          ) : (
                            <>
                              <br /><p />
                              {nganhang}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tab2" className="tab-slider--body">
                  <h2>Second Tab</h2>
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
