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
      })
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });
  }, []);

  const location = useLocation();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isCalendarClicked, setIsCalendarClicked] = React.useState(false);
  const [PlaylisticonorangeClicked, setPlaylisticonorangeClicked] =
    React.useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  React.useEffect(() => {
    setIsClicked(location.pathname === "/");
    setIsCalendarClicked(location.pathname === "/calendar");
    setPlaylisticonorangeClicked(location.pathname === "/playlist");
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

      <div className="row play">
        <img src={hopdongiconRef} alt="Setting Icon" className="icon" />
        <p className="texticon">Quản lý</p>
      </div>
      <div className="row play">
        <img src={baocaodoanhthuiconRef} alt="Setting Icon" className="icon" />
        <p className="texticon">Doanh thu</p>
      </div>
      <div className="row play">
        <img src={settingIconUrl} alt="Setting Icon" className="icon" />
        <p className="texticon">Cài đặt</p>
      </div>
      <div className="row play">
        <img src={SupportRef} alt="Setting Icon" className="icon" />
        <p className="texticon">Hỗ trợ</p>
      </div>
    </div>
  );
};

export default Sidebar;
