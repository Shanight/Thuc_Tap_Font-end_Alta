import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../slidebar/Slidebar";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import Topbar from "../../../slidebar/topbar";
import { firestore, storage } from "../../../firebase";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Rightbar from "./../rightbar";
import "./style.css";
const auth = getAuth();

function Themhopdonguyquyen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  const [selectedquoctichValue, setSelectedValue] = useState("");

  const handleSelectquoctichChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async () => {
    let gioitinh = "";
    let phapnhanuyquyen = "";
    let quoctich = selectedquoctichValue;
    if (quoctich == "") {
      quoctich = "Việt Nam";
    } else {
      quoctich = selectedquoctichValue;
    }
    // Lấy giá trị từ các ô input

    const canhan = document.getElementById("canhan") as HTMLInputElement;
    if (canhan.checked) {
      phapnhanuyquyen = canhan.value;
    } else {
      const tochuc = document.getElementById("tochuc") as HTMLInputElement;
      if (tochuc.checked) {
        phapnhanuyquyen = tochuc.value;
      } else {
        phapnhanuyquyen = "Tổ chức";
      }
    }

    const gioitinh1 = document.getElementById("gioitinh1") as HTMLInputElement;
    if (gioitinh1.checked) {
      gioitinh = gioitinh1.value;
    } else {
      const gioitinh2 = document.getElementById(
        "gioitinh2"
      ) as HTMLInputElement;
      if (gioitinh2.checked) {
        gioitinh = gioitinh2.value;
      } else {
        gioitinh = "Nữ";
      }
    }

    const ngayhieulucElement = document.getElementById(
      "ngayhieuluctext"
    ) as HTMLInputElement;
    let ngayhieuluc = "";
    if (ngayhieulucElement !== null) {
      const ngayhieuluc1 = ngayhieulucElement.value;

      // Chuyển đổi thành đối tượng ngày
      const date = new Date(ngayhieuluc1);

      // Lấy giá trị ngày, tháng, năm
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      // Định dạng lại chuỗi ngày/tháng/năm
      ngayhieuluc = `${day}/${month}/${year}`;
    }

    const ngayhethanElement = document.getElementById(
      "ngayhethantext"
    ) as HTMLInputElement;
    let ngayhethan = "";
    if (ngayhethanElement !== null) {
      const ngayhethan1 = ngayhethanElement.value;

      // Chuyển đổi thành đối tượng ngày
      const date = new Date(ngayhethan1);

      // Lấy giá trị ngày, tháng, năm
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      // Định dạng lại chuỗi ngày/tháng/năm
      ngayhethan = `${day}/${month}/${year}`;
    }

    const ngaysinhElement = document.getElementById(
      "ngaysinhtext"
    ) as HTMLInputElement;
    let ngaysinh = "";
    if (ngaysinhElement !== null) {
      const ngaysinh1 = ngaysinhElement.value;

      // Chuyển đổi thành đối tượng ngày
      const date = new Date(ngaysinh1);

      // Lấy giá trị ngày, tháng, năm
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      // Định dạng lại chuỗi ngày/tháng/năm
      ngaysinh = `${day}/${month}/${year}`;
    }

    const ngaycapElement = document.getElementById(
      "ngaycaptext"
    ) as HTMLInputElement;
    let ngaycap = "";
    if (ngaycapElement !== null) {
      const ngaycap1 = ngaycapElement.value;

      // Chuyển đổi thành đối tượng ngày
      const date = new Date(ngaycap1);

      // Lấy giá trị ngày, tháng, năm
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      // Định dạng lại chuỗi ngày/tháng/năm
      ngaycap = `${day}/${month}/${year}`;
    }

    const soHopDong = (
      document.getElementById("sohopdongtext") as HTMLInputElement
    ).value;
    const tenHopDong = (
      document.getElementById("tenhopdongtext") as HTMLInputElement
    ).value;

    const tentochuc = (
      document.getElementById("tentochuctext") as HTMLInputElement
    ).value;
    const masothue = (
      document.getElementById("masothuetext") as HTMLInputElement
    ).value;
    const sotaikhoan = (
      document.getElementById("sotaikhoantext") as HTMLInputElement
    ).value;
    const nganhang = (
      document.getElementById("nganhangtext") as HTMLInputElement
    ).value;
    const diachi = (document.getElementById("diachitext") as HTMLInputElement)
      .value;
    const nguoidaidien = (
      document.getElementById("nguoidaidientext") as HTMLInputElement
    ).value;
    const chucvu = (document.getElementById("chucvutext") as HTMLInputElement)
      .value;
    const CCCD = (document.getElementById("CCCDtext") as HTMLInputElement)
      .value;
    const noicap = (document.getElementById("noicaptext") as HTMLInputElement)
      .value;

    const noicutru = (
      document.getElementById("noicutrutext") as HTMLInputElement
    ).value;
    const sodienthoai = (
      document.getElementById("sodienthoaitext") as HTMLInputElement
    ).value;
    const email = (document.getElementById("emailtext") as HTMLInputElement)
      .value;
    const matkhau = (document.getElementById("matkhautext") as HTMLInputElement)
      .value;
    // Lấy các giá trị khác tương tự

    try {
      // Thêm dữ liệu vào Firestore

      const tempDocRef = await addDoc(
        collection(firestore, "quanlyhopdong"),
        {}
      );
      await setDoc(doc(collection(firestore, "quanlyhopdong"), tempDocRef.id), {
        id: tempDocRef.id,
        sohopdong: soHopDong,
        tenhopdong: tenHopDong,
        ngayhieuluc: ngayhieuluc,
        ngayhethan: ngayhethan,
        phapnhanuyquyen: phapnhanuyquyen,
        tentochuc: tentochuc,
        masothue: masothue,
        sotaikhoan: sotaikhoan,
        nganhang: nganhang,
        diachi: diachi,
        tennguoiuyquyen: nguoidaidien,
        chucvu: chucvu,
        ngaysinh: ngaysinh,
        gioitinh: gioitinh,
        socccd: CCCD,
        ngaycap: ngaycap,
        noicap: noicap,
        quoctich: quoctich,
        noicutru: noicutru,
        sodienthoai: sodienthoai,
        email: email,
        tendangnhap: email,
        matkhau: matkhau,
        quyentacgia: 0,
        quyennguoibieudien: 50,
        quyennhasanxuat: 50,
        // Thêm các trường khác vào đây
      });
      console.log("Dữ liệu đã được thêm vào Firestore với ID: ", tempDocRef.id);

      alert("Đã thêm thành công");
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu vào Firestore: ", error);
    }
  };

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
        <div className="main" style={{ width: "82%" }}>
          <div className="row">
            <h1>Thêm hợp đồng ủy quyền mới</h1>
          </div>
          <div className="row" style={{}}>
            <div className="col-4">
              <div className="row">
                <div className="col-4">
                  <p>Số hợp đồng:</p>
                  <p>Tên hợp đồng:</p>
                  <p>Ngày hiệu lực:</p>
                  <p>Ngày hết hạn:</p>
                </div>
                <div className="col">
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="sohopdongtext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="tenhopdongtext"
                    />
                  </p>
                  <p>
                    <input
                      type="date"
                      className="inputtextcreatehopdonguyquyen"
                      id="ngayhieuluctext"
                    />
                  </p>
                  <p>
                    <input
                      type="date"
                      className="inputtextcreatehopdonguyquyen"
                      id="ngayhethantext"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-3">
                  <p>Đính kèm tệp</p>
                </div>
                <div className="col">
                  <p>
                    <input type="file" name="filecrate" id="filecrate" />
                  </p>
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
                    0%
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>50%</p>
                  <p>50%</p>
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
                  <p>Tên tổ chức:</p>
                  <p>Mã số thuế:</p>
                  <p>Số tài khoản:</p>
                  <p>Ngân hàng:</p>
                  <p>Địa chỉ:</p>
                </div>
                <div className="col">
                  <p>
                    <input
                      type="radio"
                      name="phapnhanuyquyentext"
                      style={{}}
                      id="canhan"
                      value={"Cá nhân"}
                      checked
                    />{" "}
                    <label htmlFor="canhan">Cá nhân</label>
                    <input
                      type="radio"
                      name="phapnhanuyquyentext"
                      style={{ marginLeft: "15px" }}
                      id="tochuc"
                      value={"Tổ chức"}
                    />{" "}
                    <label htmlFor="tochuc">Tổ chức</label>
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="tentochuctext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="masothuetext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="sotaikhoantext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="nganhangtext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="diachitext"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-4">
                  <p>Người đại diện</p>
                  <p>Chức vụ</p>
                  <p>Ngày sinh</p>
                  <p>Giới tính</p>
                  <p>CCCD/CMND</p>
                  <p>Ngày cấp</p>
                  <p>Nơi cấp</p>
                  <p>Quốc tịch</p>
                </div>
                <div className="col">
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="nguoidaidientext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="chucvutext"
                    />
                  </p>
                  <p>
                    <input
                      type="date"
                      className="inputtextcreatehopdonguyquyen"
                      id="ngaysinhtext"
                    />
                  </p>
                  <p>
                    <input
                      type="radio"
                      name="gioitinh"
                      style={{}}
                      id="gioitinh1"
                      value={"Nam"}
                      checked
                    />{" "}
                    <label htmlFor="gioitinh1">Nam</label>
                    <input
                      type="radio"
                      name="gioitinh"
                      style={{ marginLeft: "15px" }}
                      id="gioitinh2"
                      value={"Nữ"}
                    />{" "}
                    <label htmlFor="gioitinh2">Nữ</label>
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="CCCDtext"
                    />
                  </p>
                  <p>
                    <input
                      type="date"
                      className="inputtextcreatehopdonguyquyen"
                      id="ngaycaptext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="noicaptext"
                    />
                  </p>
                  <p>
                    <select
                      name="quoctich"
                      id="quoctich"
                      className="inputtextcreatehopdonguyquyen"
                      value={selectedquoctichValue}
                      onChange={handleSelectquoctichChange}
                    >
                      <option value="Việt Nam">Việt Nam</option>
                      <option value="Hàn Quốc">Hàn Quốc</option>
                    </select>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="row">
                <div className="col-4">
                  <p>Nơi cư trú</p>
                  <p>Số điện thoại:</p>
                  <p>Email:</p>
                  <p>Tên đăng nhập:</p>
                  <p>Mật khẩu:</p>
                </div>
                <div className="col">
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="noicutrutext"
                      minLength={3}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="sodienthoaitext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="emailtext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="tendangnhaptext"
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="inputtextcreatehopdonguyquyen"
                      id="matkhautext"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <a href="http://localhost:3000/quanlyhopdong/" style={{
                paddingRight:"40px"
              }}>
                <button
                  style={{
                    background: "none",
                    border: "1px solid #FF7506",
                    color: "#FF7506",
                    width: "168px",
                    height: "48px",
                    borderRadius: "8px",
                  }}
                >
                  {" "}
                  Hủy
                </button>
              </a>
              <button
                onClick={handleSubmit}
                style={{ backgroundColor: "#FF7506",color:"white", width:"168px",height:"48px", borderRadius:"8px" }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="slideright">
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

export default Themhopdonguyquyen;
function setData(fetchedData: DocumentData[]) {
  throw new Error("Function not implemented.");
}
