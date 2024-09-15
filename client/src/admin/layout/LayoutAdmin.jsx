import { useState } from "react";

import { Button, Layout, Menu, theme } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ProductOutlined,
	UserOutlined,
	UnorderedListOutlined,
	BarChartOutlined,
	DollarOutlined,
} from "@ant-design/icons";

import { Routes, Route, Link } from "react-router-dom";
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
			icon: <UnorderedListOutlined />,
			label: "Category",
			href: "/admin/category",
		},
		{
			key: "4",
			icon: <ProductOutlined />,
			label: "Product",
			href: "/admin/product",
		},
		{
			key: "5",
			icon: <DollarOutlined />,
			label: "Invoice",
			href: "/admin/invoice",
		},
	];

	return (
		<Layout style={containerStyle}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
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
						icon={
							collapsed ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)
						}
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
					}}>
					<Routes>
						<Route path="dashboard" element={ null} />
						<Route path="user" element={null} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutAdmin;