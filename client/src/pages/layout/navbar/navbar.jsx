/* eslint-disable no-unused-vars */
import "./navbar.scss";
import { useState, useEffect } from "react";
import { Button, Input} from "antd";

import { Menu, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { logout, parseToken } from "../../../service/authController";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const menu = [
	{
		key: "home",
		label: <Link to="/home">Trang chủ</Link>,
	},
	{
		key: "rent-room",
		label: <Link to="/rent-room">Cho thuê phòng trọ</Link>,
	},
	{
		key: "rent-house",
		label: <Link to="/rent-house">Nhà cho thuê</Link>,
	},
	{
		key: "rent-apartment",
		label: <Link to="/rent-apartment">Cho thuê căn hộ</Link>,
	},
	{
		key: "shared-accommodation",
		label: <Link to="/shared-accommodation">Tìm người ở ghép</Link>,
	},
	{
		key: "hotel-motel",
		label: <Link to="/hotel-motel">Khách sạn nhà nghỉ</Link>,
	},
];

const MenuStyle = {
	fontSize: 15,
	fontWeight: 500,
	backgroundColor: '#004a8f',
	color:'#00b96b',
	marginRight:100,
};

const NavbarComponent = () => {
	const [isLoggedIn, setLogin] = useState(false);
	const [userName, setUsername] = useState("");
	const [current, setCurrent] = useState("home");
	const onClick = (e) => {
		setCurrent(e.key);
	};


	useEffect(() => {
		const tokenInfo = parseToken();
		if (tokenInfo !== null) {
			setLogin(true);
			setUsername(tokenInfo.username);
		}
	}, [current]);

	return (
		<div className="navbar--wrapper">
			<div className="navbar">
				<div className="navbar--menu">
					<Menu
						style={MenuStyle}
						onClick={onClick}
						selectedKeys={[current]}
						mode="horizontal"
						items={menu}
					/>
				</div>
				<div className="navbar--actions">
					<div className="navbar--post-ad">
						<Link to={"/post-ad"}>
							<Button type="primary post" shape="round">
							<i class="fa-regular fa-pen-to-square"></i>Đăng tin
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavbarComponent;