import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase";
import Home from "./Khobanghi/Home";
import Login from "./Login/login";
import Playlist from "./playlist/Playlist";
import Calendar from "./calendar/calendar";
import Resetpass from './Login/resetpasssword';
import Mainprofile from "./profile/main";
import DanhSachHopDong from "./QuanLy/DanhSachHopDong";
import QuanLyThietBi from "./QuanLy/QuanLyThietBi";
import QuanLyUyQuyen from "./QuanLy/QuanLyUyQuyen";
import QuanlySuDung from "./QuanLy/QuanLySuDung";
import BaoCaoDoanhThu from "./DoanhThu/BaoCaoDoanhThu";
import LichSuDoiSoat from "./DoanhThu/LichSuDoiSoat";
import PhanPhoiDoanhThu from "./DoanhThu/PhanPhoiDoanhThu";
import PhanQuyenNguoiDung from "./CaiDat/PhanQuyenNguoiDung";
import CauHinh from "./CaiDat/CauHinh";
import QuanLyHopDongCaiDat from "./CaiDat/QuanLyHopDongCaiDat";
import ThongTinSanPham from "./CaiDat/ThongTinSanPham";
import ChuKyDoiSoat from "./CaiDat/ChuKyDoiSoat";
import HuongDanSuDung from "./HoTro/HuongDanSuDung";
import TaiApp from "./HoTro/TaiApp";
import Feedback from "./HoTro/Feedback";
import Register from "./Login/register";
import Chitiethopdonguyquyen from "./QuanLy/chitiethopdonguyquyen";
import Themhopdonguyquyen from "./QuanLy/chitiethopdonguyquyen/create";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // You can perform additional actions here if needed
      } else {
        // User is signed out
        // You can perform additional actions here if needed
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login/resetpass" element={<Resetpass />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Mainprofile />} />
        <Route path="/quanlyhopdong" element={<DanhSachHopDong />} />
        <Route path="/quanlysudung" element={<QuanlySuDung />} />
        <Route path="/quanlythietbi" element={<QuanLyThietBi />} />
        <Route path="/quanlyuyquyen" element={<QuanLyUyQuyen />} />
        <Route path="/baocaodoanhthu" element={<BaoCaoDoanhThu />} />
        <Route path="/lichsudoisoat" element={<LichSuDoiSoat />} />
        <Route path="/phanphoidoanhthu" element={<PhanPhoiDoanhThu />} />
        <Route path="/quanlyhopdong/chitiet/:id" element={<Chitiethopdonguyquyen />} />
        <Route path="/quanlyhopdong/create" element={<Themhopdonguyquyen />} />

        <Route path="/phanquyennguoidung" element={<PhanQuyenNguoiDung />} />
        <Route path="/cauhinh" element={<CauHinh />} />
        <Route path="/quanlyhopdongcaidat" element={<QuanLyHopDongCaiDat />} />
        <Route path="/thongtinsanpham" element={<ThongTinSanPham />} />
        <Route path="/chukydoisoat" element={<ChuKyDoiSoat />} />
        <Route path="/huongdansudung" element={<HuongDanSuDung />} />
        <Route path="/taiapp" element={<TaiApp />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route
          path="*"
          element={
            auth.currentUser ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>

    
  );
}

export default App;
