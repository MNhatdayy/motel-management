// import { useState } from 'react'
import "./App.scss";
import { ConfigProvider } from "antd";

// const layoutStyle = {
// 	overflow: "hidden",
// 	width: "100%",
// 	height: "100vh",
// 	maxWidth: "calc(100% - 8px)",
// };

// const headerStyle = {
// 	textAlign: "center",
// 	color: "#fff",
// 	width: "100%",
// 	height: "70px",
// 	lineHeight: "70px",
// 	backgroundColor: "white",
// };

// const contentStyle = {
// 	textAlign: "center",
// 	minHeight: 120,
// 	lineHeight: "120px",
// 	color: "#fff",
// 	backgroundColor: "white",
// };

// const footerStyle = {
// 	textAlign: "center",
// 	color: "#fff",
// 	backgroundColor: "white",
// };

import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";

import Login from "./auth/login/Login.jsx";
import Register from "./auth/register/Register.jsx";
import { parseToken } from "./service/authController.js";
import Dashboard from "./admin/pages/dashboard/Dashboard.jsx";
import LayoutAdmin from "./admin/layout/LayoutAdmin.jsx";
import { useEffect, useState } from "react";
import HomePage from "./pages/home/HomePage.jsx";
import LayoutPage from "../src/pages/layout/LayoutPage.jsx"
function App() {
  const [isLoggedIn,setLogin] = useState(false);
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
                <Route path="" element={<Dashboard />} />

                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user" element={null} />
              </Route>
            )}
            <Route path="/home/*" element={<LayoutPage />}>
              <Route index element={<HomePage />} />
              <Route path="" element={<HomePage />} />
            </Route>

            <Route path="/auth/*">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route exact path="/" element={<HomePage />} replace />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
