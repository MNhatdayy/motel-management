import { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message, Upload } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById, updateRoom } from "../../../../service/roomController";
// import "./update.scss";
const UpdateRoom = () => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const response = await getRoomById(id);
        setInitialValues(response.data);
        form.setFieldsValue(response.data);
        setImage(response.data.image);
        setLoading(false);
      } catch (err) {
        message.error("Có lỗi xảy ra khi lấy thông tin phòng", err.message);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id, form]);

  const handleImageUpload = (info) => {
    const file = info.fileList[0].originFileObj;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      // const draggerElement = document.querySelector(".ant-upload-drag");
      // if (draggerElement) {
      //   draggerElement.scrollIntoView({ behavior: "smooth", block: "start" });
      // }
    };
    reader.readAsDataURL(file);
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateRoom(id, { ...values, image });
      message.success("Cập nhật phòng thành công!");
      navigate("/admin/room");
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật phòng: " + error.message);
      setLoading(false);
    }
  };
  if (loading || !initialValues) return <div>Loading...</div>;
  return (
    <div className="update-room">
      <h1 className="title">Cập Nhật Phòng</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Chủ sở hữu"
          name="owner_id"
          style={{ display: "none" }}
          rules={[{ required: true, message: "Vui lòng nhập chủ sở hữu!" }]}
        >
          <Input placeholder="ID của chủ sở hữu" disabled />{" "}
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
            {image ? (
              <img
                src={image}
                alt="current"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <p className="ant-upload-drag-icon">
                Hãy bấm vào đây để thêm ảnh
              </p>
            )}
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập Nhật Phòng
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

export default UpdateRoom;
