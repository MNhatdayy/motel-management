import React, { useState } from "react";
import { Button, Form, Input, message, ConfigProvider } from "antd";
import { forgotPassword } from "../../service/authController";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    setLoading(true);
    const success = await forgotPassword(email);
    if (success) {
      message.success("OTP has been sent to your email!");
      navigate("/auth/reset-password"); // Redirect to Reset Password page
    } else {
      message.error("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#004a8f",
          colorPrimaryHover: "#003c74",
          controlInteractiveOutline: "#004a8f",
          colorBgContainer: "#ffffff",
          colorBgContainerHover: "#f6ffed",
          colorBorder: "#004a8f",
        },
      }}
    >
      <div className="wrapper">
        <h3>Forgot Password</h3>
        <Form
          name="forgot-password"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Send OTP
          </Button>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default ForgotPassword;