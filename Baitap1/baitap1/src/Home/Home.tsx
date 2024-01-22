import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Sidebar from './Slidebar';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';
import Topbar from './topbar';

const auth = getAuth();

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
      } else {
        // Người dùng đã đăng xuất
        navigate('/login'); // Chuyển hướng đến trang "Login"
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
        navigate('/login'); // Chuyển hướng đến trang "Login"
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };

  return (
    <div className="app">
      <Topbar />
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div>Welcome, {user ? user.email : ''}</div>
          <button onClick={handleSignOut}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default Home;