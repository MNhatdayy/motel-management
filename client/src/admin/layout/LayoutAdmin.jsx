import { useState } from "react";

import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BarChartOutlined,
  StarOutlined,
  MessageOutlined,
  BookOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./layoutadmin.scss";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/management/users/Users";
import Bookings from "../pages/management/bookings/Bookings";
import Reviews from "../pages/management/reviews/Reviews";
import Rooms from "../pages/management/rooms/Rooms";
import Messages from "../pages/management/messages/Messages";
import UpdateUser from "../pages/management/users/Update";
import CreateUser from "../pages/management/users/Create";
import CreateRoom from "../pages/management/rooms/Create";
import UpdateRoom from "../pages/management/rooms/Update";

const { Header, Sider, Content } = Layout;
const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const menu = [
    {
      key: "1",
      icon: <BarChartOutlined />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "User",
      href: "/admin/user",
    },
    {
      key: "3",
      icon: <HomeOutlined />,
      label: "Room",
      href: "/admin/room",
    },
    {
      key: "4",
      icon: <BookOutlined />,
      label: "Booking",
      href: "/admin/booking",
    },
    {
      key: "5",
      icon: <MessageOutlined />,
      label: "Message",
      href: "/admin/message",
    },
    {
      key: "6",
      icon: <StarOutlined />,
      label: "Review",
      href: "/admin/review",
    },
  ];

  return (
    <Layout style={containerStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={200}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {menu.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.href ? (
                <Link to={item.href}>{item.label}</Link>
              ) : (
                item.label
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
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
            <Route path="booking" element={<Bookings />} />
            <Route path="message" element={<Messages />} />{" "}
            <Route path="review" element={<Reviews />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
