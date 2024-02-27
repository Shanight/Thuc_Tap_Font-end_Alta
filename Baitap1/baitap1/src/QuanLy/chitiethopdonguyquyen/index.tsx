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
          // Thực hiện các xử lý bổ sung tại đây, ví dụ: redirect hoặc hiển thị thông báo lỗi
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

//hieuung
const tabBodies = document.querySelectorAll('.tab-slider--body');
    tabBodies.forEach((body, index) => {
      if (index === 0) {
        (body as HTMLElement).style.display = 'block';
      } else {
        (body as HTMLElement).style.display = 'none';
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
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const tabBodies = document.querySelectorAll('.tab-slider--body');
    tabBodies.forEach((body) => {
      if (body.id === tabId) {
        (body as HTMLElement).style.display = 'block';
      } else {
        (body as HTMLElement).style.display = 'none';
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
                    Tab 1
                  </li>
                  <li
                    className={`tab-slider--trigger ${
                      activeTab === "tab2" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab2")}
                    rel="tab2"
                  >
                    Tab 2
                  </li>
                </ul>
              </div>
              <div className="tab-slider--container">
                <div id="tab1" className="tab-slider--body">
                  <h2>First Tab</h2>
                  <p>
                    Toggle switch style tab navigation. Currently only works
                    with two tabs.
                  </p>
                  <p>
                    Donec ullamcorper nulla non metus auctor fringilla. Donec
                    ullamcorper nulla non metus auctor fringilla. Aenean eu leo
                    quam. Pellentesque ornare sem lacinia quam venenatis
                    vestibulum. Nullam id dolor id nibh ultricies vehicula ut id
                    elit. Nulla vitae elit libero, a pharetra augue.
                  </p>
                </div>
                <div id="tab2" className="tab-slider--body">
                  <h2>Second Tab</h2>
                  <p>
                    Cum sociis natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Cras mattis consectetur
                    purus sit amet fermentum. Nulla vitae elit libero, a
                    pharetra augue. Cras mattis consectetur purus sit amet
                    fermentum. Aenean eu leo quam. Pellentesque ornare sem
                    lacinia quam venenatis vestibulum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{}}>
            <div className="col-4">
              <div className="row">
                <div className="col-3">
                  <p>Số hợp đồng:</p>
                  <p>Tên hợp đồng:</p>
                  <p>Ngày hiệu lực:</p>
                  <p>Ngày hết hạn:</p>
                  <p>Tình trạng:</p>
                </div>
                <div className="col">
                  <p>{sohopdong}</p>
                  <p>{tenhopdong}</p>
                  <p>{ngayhieuluc}</p>
                  <p>{ngayhethan}</p>
                  <p>Còn thời hạn</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-3">
                  <p>Đính kèm tệp</p>
                </div>
                <div className="col">
                  <p>Hetthuongmetnho.mp3</p>
                  <p>test2.doc</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-6">
                  <p>Mức nhuận bút</p>
                  <p>Quyền tác giả:</p>
                  <p>Quyền liên quan:</p>
                  <p>Quyền của người biểu diễn:</p>
                  <p>Quyền của nhà sản xuất {"(Bản ghi/video)"}</p>
                </div>
                <div className="col">
                  <p></p>
                  <p>
                    <br />
                    {quyentacgia}%
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>{quyennguoibieudien}%</p>
                  <p>{quyennhasanxuat}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "30px" }}>
            <p>Thông tin pháp nhân ủy quyền</p>
            <div className="col-4">
              <div className="row">
                <div className="col-4">
                  <p>Pháp nhân ủy quyền:</p>
                  <p>Tên người ủy quyền:</p>
                  <p>Ngày sinh:</p>
                  <p>Giới tính:</p>
                  <p>Quốc tịch:</p>
                  <p>Số điện thoại:</p>
                </div>
                <div className="col">
                  <p>{phapnhanuyquyen}</p>
                  <p>{tennguoiuyquyen}</p>
                  <p>{ngaysinh}</p>
                  <p>{gioitinh}</p>
                  <p>{quoctich}</p>
                  <p>{sodienthoai}</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-4">
                  <p>Số CMND/CCCD</p>
                  <p>Ngày cấp</p>
                  <p>Nơi cấp</p>
                  <p>Mã số thuế</p>
                  <p>Nơi cư chú</p>
                </div>
                <div className="col">
                  <p>{socccd}</p>
                  <p>{ngaycap}</p>
                  <p>{noicap}</p>
                  <p>{masothue}</p>
                  <p>{noicutru}</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-6">
                  <p>Email:</p>
                  <p>Tài khoản đăng nhập:</p>
                  <p>Mật khẩu:</p>
                  <p>Số tài khoản:</p>
                  <p>Ngân hàng:</p>
                </div>
                <div className="col">
                  <p>{email}</p>
                  <p>{email}</p>
                  <p>************</p>
                  <p>{sotaikhoan}</p>
                  <p>{nganhang}</p>
                </div>
              </div>
            </div>
          </div>

          <div>Welcome, {user ? user.email : ""}</div>
          <button onClick={handleSignOut}>Đăng xuất</button>
        </div>
        <div className="slideright">
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

export default Chitiethopdonguyquyen;
function setData(fetchedData: DocumentData[]) {
  throw new Error("Function not implemented.");
}
