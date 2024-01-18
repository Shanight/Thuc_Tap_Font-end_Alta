import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Login from "./login";

const AppRouter = () => {
  const isLoggedIn = true; // Thay đổi giá trị này tùy thuộc vào trạng thái đăng nhập
  
  return (
    <Router>
        <Routes>
            <Route path="/login">
                login
            </Route>
            <Route path="/home">
                home
            </Route>
        </Routes>

    </Router>
  );
};

export default AppRouter;   