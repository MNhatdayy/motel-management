import "./App.scss";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login/Login.jsx";
import Register from "./auth/register/Register.jsx";
import Forgot from "./auth/forgot/forgot";
import { parseToken } from "./service/authController.js";
import Dashboard from "./admin/pages/dashboard/Dashboard.jsx";
import LayoutAdmin from "./admin/layout/LayoutAdmin.jsx";
import { useEffect, useState } from "react";
import HomePage from "./pages/home/HomePage.jsx";
import LayoutPage from "../src/pages/layout/LayoutPage.jsx";
import Users from "./admin/pages/management/users/Users";
import Bookings from "./admin/pages/management/bookings/Bookings.jsx";
import Messages from "./admin/pages/management/messages/Messages.jsx";
import Reviews from "./admin/pages/management/reviews/Reviews.jsx";
import Rooms from "./admin/pages/management/rooms/Rooms.jsx";
import UpdateUser from "./admin/pages/management/users/Update.jsx";
import CreateUser from "./admin/pages/management/users/Create.jsx";
import CreateRoom from "./admin/pages/management/rooms/Create.jsx";
import UpdateRoom from "./admin/pages/management/rooms/Update.jsx";
import ForgotPassword from "./auth/forgot/forgot";
import ResetPassword from "./auth/reset-password/ResetPassword";

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    const tokenInfo = parseToken();
    if (tokenInfo !== null) {
      setLogin(true);
      setRole(tokenInfo.role);
    }
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <div className="full">
        <Router>
          <Routes>
            {role === "ADMIN" && (
              <Route path="/admin/*" element={<LayoutAdmin />}>
                <Route index element={<Dashboard />} />
                <Route path="user">
                  <Route path="" element={<Users />} />
                  <Route path="update/:id" element={<UpdateUser />} />
                  <Route path="create" element={<CreateUser />} />
                </Route>
                <Route path="room">
                  <Route path="" element={<Rooms />} />
                  <Route path="update/:id" element={<UpdateRoom />} />
                  <Route path="create" element={<CreateRoom />} />
                </Route>
                <Route path="booking">
                  <Route path="" element={<Bookings />} />
                </Route>
                <Route path="message" element={<Messages />} />
                <Route path="review" element={<Reviews />} />
              </Route>
            )}
            <Route path="/*" element={<LayoutPage />}>
              <Route index element={<HomePage />} />
              <Route path="" element={<HomePage />} />
            </Route>

            <Route path="/auth/*">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot" element={<ForgotPassword/>}/>
              <Route path="reset-password" element={<ResetPassword/>}/>
            </Route>

            <Route exact path="/" element={<HomePage />} replace />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
