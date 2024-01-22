import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Slidebar.css";
import logo from "../logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { ref, getStorage, getMetadata } from "firebase/storage";

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storage = getStorage();
    const forestRef = ref(storage, "images/logo.png");

    getMetadata(forestRef)
      .then((metadata) => {
        // Lấy URL của ảnh từ metadata và cập nhật state
        const url = metadata.fullPath;
        setImageUrl(url);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="logo" />}</div>;
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="row side">
        <img src={logo} alt="" className="logo" />
      </div>

      <div className="row play">
        <FontAwesomeIcon
          icon={faCirclePlay}
          style={{ boxSizing: "border-box", marginTop: "30%" }}
          className="buttonslide"
        />
        <p>Kho bản ghi</p>
      </div>

      {/* Sử dụng ImageComponent để hiển thị ảnh */}
      <ImageComponent />
    </div>
  );
};

export default Sidebar;
