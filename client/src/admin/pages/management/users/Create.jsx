import { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../service/userController";

const { Option } = Select;

const CreateUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // On form submit (create user)
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createUser(values); // Call create user API
      message.success("Tạo người dùng thành công");
      navigate("/admin/users"); // Redirect to user list page after success
    } catch (err) {
      message.error("Lỗi khi tạo người dùng", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h1>TẠO NGƯỜI DÙNG MỚI</h1>
      {/* Name */}
      <Form.Item
        name="name"
        label="Tên"
        rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
      >
        <Input />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Vui lòng nhập email người dùng" },
          { type: "email", message: "Vui lòng nhập địa chỉ email hợp lệ" },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Address */}
      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[
          { required: true, message: "Vui lòng nhập địa chỉ người dùng" },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Phone Number */}
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại người dùng" },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Role */}
      <Form.Item
        name="role"
        label="Vai trò"
        rules={[
          { required: true, message: "Vui lòng chọn vai trò người dùng" },
        ]}
      >
        <Select>
          <Option value="User">USER</Option>
          <Option value="Admin">ADMIN</Option>
        </Select>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tạo người dùng
        </Button>
        <Button onClick={() => navigate("/admin/users")}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
