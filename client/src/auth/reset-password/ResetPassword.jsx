import React, { useState } from "react";
import { Button, Form, Input, message, ConfigProvider } from "antd";
import { resetPassword } from "../../service/authController";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, otp, newPassword } = values;
    setLoading(true);
    const success = await resetPassword(email, otp, newPassword);
    if (success) {
      message.success("Password reset successful!");
      navigate("/auth/login");
    } else {
      message.error("Failed to reset password. Please try again.");
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
        <h3>Reset Password</h3>
        <Form
          form={form}
          name="reset-password"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="OTP"
            name="otp"
            rules={[{ required: true, message: "Please input the OTP!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please input your new password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default ResetPassword;