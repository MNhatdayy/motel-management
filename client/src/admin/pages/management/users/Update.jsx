import { useState, useEffect } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../../../service/userController";

const { Option } = Select;

const UpdateUser = () => {
  const [form] = Form.useForm();
  const { id } = useParams(); // Lấy ID người dùng từ URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Lấy thông tin chi tiết của người dùng và điền vào các field trong form
    const getUserDetails = async () => {
      try {
        const userData = await getUserById(id); // Gọi API lấy thông tin chi tiết người dùng
        form.setFieldsValue({
          name: userData.name,
          email: userData.email,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
        });
      } catch (err) {
        message.error("Lỗi khi lấy thông tin người dùng", err.message);
      }
    };

    getUserDetails();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateUser(id, values);
      message.success("Cập nhật người dùng thành công");
      navigate("/admin/user");
    } catch (err) {
      message.error("Lỗi khi cập nhật người dùng", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h1>CẬP NHẬT NGƯỜI DÙNG</h1>

      <Form.Item
        name="name"
        label="Tên"
        rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Vui lòng nhập địa chỉ email hợp lệ" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Vai trò"
        rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
      >
        <Select>
          <Option value="User">USER</Option>
          <Option value="Admin">ADMIN</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật
        </Button>
        <Button onClick={() => navigate("/admin/users")}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUser;
