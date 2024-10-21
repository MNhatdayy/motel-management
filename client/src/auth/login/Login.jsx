import { Link } from "react-router-dom";
// import "./login.scss";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message, ConfigProvider } from "antd";

import { login } from "../../service/authController";
import "./login.scss";
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login success!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Login failed!",
    });
  };
  const navigate = useNavigate();
  const loginFunction = async (values) => {
    login(values.email, values.password)
      .then((value) => {
        if (value !== null) {
          success();
          return navigate("/home");
        }
      })
      .catch(() => {
        error();
        return navigate("/auth/login");
      });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#004a8f", // Main primary color (for buttons, links, etc.)
          // Outline color when focused
          colorPrimaryHover: "#003c74", // Hover state color for primary elements
          controlInteractiveOutline: "#004a8f", // Outline color for interactive controls
          colorBgContainer: "#ffffff", // Background color of input fields
          colorBgContainerHover: "#f6ffed", // Background color on hover
          colorBorder: "#004a8f", // Border color
        },
      }}
    >
      <div className="wrapper">
        <h3>Đăng nhập</h3>
        {contextHolder}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={loginFunction}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="forgot-password">
            <Link to={"/auth/forgot"}>Quên mật khẩu?</Link>
          </div>

          <div className="button--wrapper">
            <Button type="primary" htmlType="submit" shape="round" block>
              Đăng nhập
            </Button>

            <Link to={"/auth/register"} width="100%">
              <Button htmlType="button" shape="round" block>
                Tạo tài khoản mới
              </Button>
            </Link>
          </div>
          <div className="button--back">
            <Link to={"/shop"} width="100%">
              <Button htmlType="button" shape="round" block>
                Trở lại trang chủ
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default Login;
