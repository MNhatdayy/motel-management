import "./layout.scss";

import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
import { Routes, Route } from "react-router-dom";

const headerStyle = {
	color: "#fff",
	height: 70,
	backgroundColor: "white",
};
const contentStyle = {
	minHeight: 100,
	color: "#fff",
	marginTop: 24,
	// backgroundColor: "dark",
};

const footerStyle = {
	color: "#fff",
	backgroundColor: "#3b3b3b",
};
const layoutStyle = {
	borderRadius: 8,
	width: "100%",
};

import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import HomePage from "../home/HomePage";

const LayoutShop = () => {
	return (
		<>
			<div className="full">
				<div id="container">
					<Layout style={layoutStyle}>
						<Header style={headerStyle}>
							<HeaderComponent />
						</Header>
						<Content style={contentStyle}>
							<Routes>
								<Route path="" element={<HomePage />} />
								<Route path="*" element={<HomePage />} />
							</Routes>
						</Content>
						<Footer style={footerStyle}>
							<FooterComponent />
						</Footer>
					</Layout>
				</div>
			</div>
		</>
	);
};

export default LayoutShop;