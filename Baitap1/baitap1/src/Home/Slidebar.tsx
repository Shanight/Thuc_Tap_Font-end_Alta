import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Slidebar.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  //Lấy ảnh từ firebase
  const [logoUrl, setLogoUrl] = useState("");
  const [settingIconUrl, setSettingIconUrl] = useState("");
  const [BanghiiconRef, setBanghiiconRef] = useState("");
  const [PlaylisticonRef, setPlaylisticonRef] = useState("");
  const [hopdongiconRef, sethopdongiconRef] = useState("");
  const [baocaodoanhthuiconRef, setbaocaodoanhthuiconRef] = useState("");
  const [SupportRef, setSupportRef] = useState("");
  const [calendarRef, setcalendarRef] = useState("");

  useEffect(() => {
    const logoRef = ref(storage, "images/logo.png");
    const settingiconRef = ref(storage, "icon/Settingicon.png");
    const BanghiiconRef = ref(storage, "icon/Banghiicon.png");
    const PlaylisticonRef = ref(storage, "icon/Playlisticon.png");
    const hopdongiconRef = ref(storage, "icon/hopdongicon.png");
    const baocaodoanhthuiconRef = ref(storage, "icon/baocaodoanhthuicon.png");
    const SupportRef = ref(storage, "icon/Support.png");
    const calendarRef = ref(storage, "icon/calendar.png");
    Promise.all([
      getDownloadURL(logoRef),
      getDownloadURL(settingiconRef),
      getDownloadURL(BanghiiconRef),
      getDownloadURL(PlaylisticonRef),
      getDownloadURL(baocaodoanhthuiconRef),
      getDownloadURL(hopdongiconRef),
      getDownloadURL(SupportRef),
      getDownloadURL(calendarRef),
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
      })
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });
  }, []);

  return (
    <div className="sidebar">
      <div className="row side">
        <img src={logoUrl} alt="Logo" className="logohome" />
      </div>

      <div className="row play" style={{ marginTop: "70px" }} onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}>
        <img src={BanghiiconRef} alt="Setting Icon" className="icon" />
        <p className="texticon">Kho bản ghi</p>
      </div>
      <div className="row play">
        <img src={PlaylisticonRef} alt="Setting Icon" className="icon" />
        <p className="texticon">Playlist</p>
      </div>
      <div className="row play">
        <img src={calendarRef} alt="Setting Icon" className="icon" />
        <p className="texticon">Lập lịch phát</p>
      </div>
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
