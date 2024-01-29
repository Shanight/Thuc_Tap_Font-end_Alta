import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Slidebar.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Sidebar = () => {
  //Lấy ảnh từ firebase
  const [logoUrl, setLogoUrl] = useState("");
  const [settingIconUrl, setSettingIconUrl] = useState("");
  const [BanghiiconRef, setBanghiiconRef] = useState("");
  const [BanghiiconorganeRef, setBanghiiconorganeRef] = useState("");
  const [PlaylisticonRef, setPlaylisticonRef] = useState("");
  const [hopdongiconRef, sethopdongiconRef] = useState("");
  const [baocaodoanhthuiconRef, setbaocaodoanhthuiconRef] = useState("");
  const [SupportRef, setSupportRef] = useState("");
  const [calendarRef, setcalendarRef] = useState("");
  const [calendarorganeRef, setcalendarorganeRef] = useState("");
  const [PlaylisticonorangeRef, setPlaylisticonorangeRef] = useState("");
  const [hopdongorganeiconRef, sethopdongorganeiconRef] = useState("");
  const [doanhthuorganeiconRef, setdoanhthuorganeiconRef] = useState("");
  const [SettingiconorganeRef, setSettingiconorganeRef] = useState("");
  const [SupportorganeRef, setSupportorganeRef] = useState("");

  useEffect(() => {
    const logoRef = ref(storage, "images/logo.png");
    const settingiconRef = ref(storage, "icon/Settingicon.png");
    const BanghiiconorganeRef = ref(storage, "icon/Banghiiconorgane.png");
    const BanghiiconRef = ref(storage, "icon/Banghiicon.png");
    const PlaylisticonRef = ref(storage, "icon/Playlisticon.png");
    const hopdongiconRef = ref(storage, "icon/hopdongicon.png");
    const baocaodoanhthuiconRef = ref(storage, "icon/baocaodoanhthuicon.png");
    const SupportRef = ref(storage, "icon/Support.png");
    const calendarRef = ref(storage, "icon/calendar.png");
    const calendarorganeRef = ref(storage, "icon/calendarorgane.png");
    const PlaylisticonorangeRef = ref(storage, "icon/Playlisticonorange.png");
    const hopdongorganeiconRef = ref(storage, "icon/hopdongorganeicon.png");
    const doanhthuorganeiconRef = ref(storage, "icon/doanhthuorganeicon.png");
    const SettingiconorganeRef = ref(storage, "icon/Settingiconorgane.png");
    const SupportorganeRef = ref(storage, "icon/Supportorgane.png");

    Promise.all([
      getDownloadURL(logoRef),
      getDownloadURL(settingiconRef),
      getDownloadURL(BanghiiconRef),
      getDownloadURL(PlaylisticonRef),
      getDownloadURL(baocaodoanhthuiconRef),
      getDownloadURL(hopdongiconRef),
      getDownloadURL(SupportRef),
      getDownloadURL(calendarRef),
      getDownloadURL(BanghiiconorganeRef),
      getDownloadURL(calendarorganeRef),
      getDownloadURL(PlaylisticonorangeRef),
      getDownloadURL(hopdongorganeiconRef),
      getDownloadURL(doanhthuorganeiconRef),
      getDownloadURL(SettingiconorganeRef),
      getDownloadURL(SupportorganeRef),
    ])
      .then((urls) => {
        setLogoUrl(urls[0]);
        setSettingIconUrl(urls[1]);
        setBanghiiconRef(urls[2]);
        setPlaylisticonRef(urls[3]);
        sethopdongiconRef(urls[4]);
        setbaocaodoanhthuiconRef(urls[5]);
        setSupportRef(urls[6]);
        setcalendarRef(urls[7]);
        setBanghiiconorganeRef(urls[8]);
        setcalendarorganeRef(urls[9]);
        setPlaylisticonorangeRef(urls[10]);
        sethopdongorganeiconRef(urls[11]);
        setdoanhthuorganeiconRef(urls[12]);
        setSettingiconorganeRef(urls[13]);
        setSupportorganeRef(urls[14]);
      })
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });
  }, []);

  const location = useLocation();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isCalendarClicked, setIsCalendarClicked] = React.useState(false);
  const [isQuanLyClicked, setIsQuanLyClicked] = React.useState(false);
  const [isDoanhThuClicked, setIsDoanhThuClicked] = React.useState(false);
  const [isCaiDatClicked, setIsCaiDatClicked] = React.useState(false);
  const [isHoTroClicked, setIsHoTroClicked] = React.useState(false);
  const [PlaylisticonorangeClicked, setPlaylisticonorangeClicked] =
    React.useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  React.useEffect(() => {
    const path = location.pathname;
    setIsClicked(path === "/");
    setIsCalendarClicked(path === "/calendar");
    setPlaylisticonorangeClicked(path === "/playlist");
    setIsQuanLyClicked(
      path === "/quanlyhopdong" ||
        path === "/quanlythietbi" ||
        path === "/quanlyuyquyen" ||
        path === "/quanlysudung"
    );
    setIsDoanhThuClicked(
      path === "/baocaodoanhthu" ||
        path === "/lichsudoisoat" ||
        path === "/phanphoidoanhthu"
    );
    setIsCaiDatClicked(
      path === "/phanquyennguoidung" ||
        path === "/cauhinh" ||
        path === "/thongtinsanpham" ||
        path === "/chukydoisoat" ||
        path === "/quanlyhopdongcaidat"
    );
    setIsHoTroClicked(
      path === "/huongdansudung" ||
        path === "/taiapp" ||
        path === "/feedback"
    );
  }, [location]);

  return (
    <div className="sidebar">
      <div className="row side">
        <img src={logoUrl} alt="Logo" className="logohome" />
      </div>
      <Link to="/" className={`link ${isClicked ? "active" : ""}`}>
        <button
          className={`row play button-margin ${isClicked ? "active" : ""}`}
          onClick={handleClick}
          style={{ marginTop: "90px" }}
        >
          <img
            src={isClicked ? BanghiiconorganeRef : BanghiiconRef}
            alt="Setting Icon"
            className="icon"
          />
          <p className="texticon">Kho bản ghi</p>
        </button>
      </Link>

      <Link
        to="/playlist"
        className={`link ${PlaylisticonorangeClicked ? "active" : ""}`}
      >
        <button
          className={`row play button-margin ${
            PlaylisticonorangeClicked ? "active" : ""
          }`}
        >
          <img
            src={
              PlaylisticonorangeClicked
                ? PlaylisticonorangeRef
                : PlaylisticonRef
            }
            alt="Setting Icon"
            className="icon"
          />
          <p className="texticon">Playlist</p>
        </button>
      </Link>
      <Link
        to="/calendar"
        className={`link ${isCalendarClicked ? "active" : ""}`}
      >
        <button
          className={`row play button-margin ${
            isCalendarClicked ? "active" : ""
          }`}
          onClick={handleClick}
        >
          <img
            src={isCalendarClicked ? calendarorganeRef : calendarRef}
            alt="Setting Icon"
            className="icon"
          />
          <p className="texticon">Lập lịch phát</p>
        </button>
      </Link>

      <div className=" dropend">
        <button
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className={`row play button-margin ${
            isQuanLyClicked ? "active" : ""
          }`}
        >
          <img
            src={isQuanLyClicked ? hopdongorganeiconRef : baocaodoanhthuiconRef}
            alt="Setting Icon"
            className="icon"
          />
          <p className="texticon">Quản lý</p>
        </button>
        <ul className="dropdown-menu">
          <div>
            <li>
              <Link to="/quanlyhopdong" className="dropdown-item">
                Quản lý hợp đồng
              </Link>
            </li>
            <li>
              <Link to="/quanlythietbi" className="dropdown-item">
                Quản lý thiết bị
              </Link>
            </li>
            <li>
              <Link to="/quanlyuyquyen" className="dropdown-item">
                Quản lý ủy quyền
              </Link>
            </li>
            <li>
              <Link to="/quanlysudung" className="dropdown-item">
                Quản lý sử dụng
              </Link>
            </li>
          </div>
        </ul>
      </div>

      <div className=" dropend">
        <button
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className={`row play button-margin ${
            isDoanhThuClicked ? "active" : ""
          }`}
        >
          <img
            src={isDoanhThuClicked ? doanhthuorganeiconRef : hopdongiconRef}
            alt="Setting Icon"
            className="icon"
          />
          <p className="texticon">Doanh thu</p>
        </button>
        <ul className="dropdown-menu">
          <div>
            <li>
              <Link to="/baocaodoanhthu" className="dropdown-item">
                Báo cáo doanh thu
              </Link>
            </li>
            <li>
              <Link to="/lichsudoisoat" className="dropdown-item">
                Lịch sử đối soát
              </Link>
            </li>
            <li>
              <Link to="/phanphoidoanhthu" className="dropdown-item">
                Phân phối doanh thu
              </Link>
            </li>
          </div>
        </ul>
      </div>

      <div className=" dropend">
        <button
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className={`row play button-margin ${
            isCaiDatClicked ? "active" : ""
          }`}
        >
          <img src={isCaiDatClicked ?  SettingiconorganeRef : settingIconUrl} alt="Setting Icon" className="icon" />
          <p className="texticon">Cài đặt</p>
        </button>
        <ul className="dropdown-menu">
          <div>
            <li>
              <Link to="/phanquyennguoidung" className="dropdown-item">
                Phân quyền người dùng
              </Link>
            </li>
            <li>
              <Link to="/cauhinh" className="dropdown-item">
                Cấu hình
              </Link>
            </li>
            <li>
              <Link to="/quanlyhopdongcaidat" className="dropdown-item">
                Quản lý hợp đồng
              </Link>
            </li>
            <li>
              <Link to="/thongtinsanpham" className="dropdown-item">
                Thông tin sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/chukydoisoat" className="dropdown-item">
                Chu kỳ đối soát
              </Link>
            </li>
          </div>
        </ul>
      </div>

      <div className=" dropend">
        <button
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className={`row play button-margin ${
            isHoTroClicked ? "active" : ""
          }`}
        >
          <img src={isHoTroClicked ? SupportorganeRef : SupportRef} alt="Setting Icon" className="icon" />
          <p className="texticon">Hỗ trợ</p>
        </button>
        <ul className="dropdown-menu">
          <div>
            <li>
              <Link to="/huongdansudung" className="dropdown-item">
                Hướng dẫn sử dụng
              </Link>
            </li>
            <li>
              <Link to="/taiapp" className="dropdown-item">
                Tải App
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="dropdown-item">
                Feedback
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
