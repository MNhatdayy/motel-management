import "./register.scss";

import { Button, Form, Input, ConfigProvider } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../service/authController";

const Register = () => {
	const navigate = useNavigate();

	const registerFunction = async (values) => {
		if (values.password !== values.confirmPassword) {
			values = {};
			console.log("Hai mật khẩu không trùng khớp với nhau");
			return false;
		} else {
			register(
				values.name,
				values.email,
				values.password,
				values.phoneNumber,
				values.address,
			).then((value) => {
				if (value) {
					return navigate("/auth/login");
				} else {
					return navigate("/auth/register");
				}
			});
		}
	};
	return (
		<ConfigProvider
		theme={{
			token: {
				 colorPrimary: '#004a8f', // Main primary color (for buttons, links, etc.)
       // Outline color when focused
      colorPrimaryHover: '#003c74', // Hover state color for primary elements
      controlInteractiveOutline: '#004a8f', // Outline color for interactive controls
      colorBgContainer: '#ffffff', // Background color of input fields
      colorBgContainerHover: '#f6ffed', // Background color on hover
      colorBorder: '#004a8f', // Border color
			},
		}}>
		<div className="wrapper">
			<h3>Đăng ký</h3>
			<Form
			
				name="basic"
				labelCol={{
					span: 10,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 800,
				}}
				initialValues={{
					remember: true,
				}}
				autoComplete="off"
				onFinish={registerFunction}>
				<Form.Item
					label="Tên tài khoản"
					name="name"
					labelAlign="left"
					
					rules={[
						{
							required: true,
							message: "Please input your name!",
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					labelAlign="left"
					rules={[
						{
							required: true,
							message: "Please input your email!",
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Số điện thoại"
					name="phoneNumber"
					labelAlign="left"
					rules={[
						{
							required: true,
							message: "Please input your phone!",
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Địa chỉ"
					name="address"
					labelAlign="left"
					rules={[
						{
							required: true,
							message: "Please input your address!",
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Mật khẩu"
					name="password"
					labelAlign="left"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Nhập lại mật khẩu"
					name="confirmPassword"
					labelAlign="left"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}>
					<Input.Password />
				</Form.Item>
				<div className="button--wrapper">
					<Button
						type="primary"
						htmlType="submit"
						shape="round"
						block>
						Register
					</Button>

					<Link to={"/auth/login"} width="100%">
						<Button htmlType="button" shape="round" block>
							Back to login
						</Button>
					</Link>
				</div>
			</Form>
		</div>
		</ConfigProvider>
	);
};

export default Register;