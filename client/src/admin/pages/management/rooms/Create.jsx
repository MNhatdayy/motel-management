import { useEffect, useState } from "react";
import { Form, Input, Button, message, Checkbox, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../../../service/roomController"; // Import service createRoom
import { parseToken } from "../../../../service/authController";

const CreateRoom = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  useEffect(() => {
    const user = parseToken();
    if (user) {
      form.setFieldsValue({ owner_id: user.id });
    }
  }, [form]);
  const handleImageUpload = (info) => {
    const file = info.fileList[0].originFileObj;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createRoom({ ...values, image });
      message.success("Tạo phòng thành công!");
      navigate("/admin/room");
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo phòng: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-room">
      <h1 className="title">Tạo Phòng Mới</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Chủ sở hữu"
          name="owner_id"
          rules={[{ required: true, message: "Vui lòng nhập chủ sở hữu!" }]}
        >
          <Input placeholder="your id" disabled />{" "}
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input placeholder="Nhập địa chỉ phòng" />
        </Form.Item>
        <Form.Item
          label="Diện tích"
          name="size"
          rules={[{ required: true, message: "Vui lòng nhập diện tích!" }]}
        >
          <Input placeholder="Nhập diện tích phòng" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả phòng" />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá phòng!" }]}
        >
          <Input placeholder="Nhập giá phòng" type="number" />
        </Form.Item>
        <Form.Item label="Trạng thái" name="available" valuePropName="checked">
          <Checkbox>Còn trống</Checkbox>
        </Form.Item>
        <Form.Item label="Hình ảnh chính">
          <Upload.Dragger
            name="imageUrl"
            listType="picture"
            multiple={false}
            onChange={handleImageUpload}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <p className="ant-upload-drag-icon">Hãy bấm vào đây để thêm ảnh</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo Phòng
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/admin/room")}
          >
            Exit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRoom;
