import { useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewById, updateReview } from "../../../../service/reviewController";
import "./reviews.scss";

const UpdateReview = () => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchReview = async () => {
    setLoading(true);
    try {
      const data = await getReviewById(id);
      setInitialValues(data.data);
      form.setFieldsValue({
        roomId: data.roomId,
        userId: data.userId,
        rating: data.rating,
        comment: data.comment,
      });
      setLoading(false);
    } catch (error) {
      message.error(`Error fetching review: ${error.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReview();
  }, [id]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateReview(id, values);
      message.success("Cập nhật đánh giá thành công!");
      navigate("/admin/review");
    } catch (error) {
      message.error(`Error updating review: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="update-review">
      <h1>Update Review</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Room"
          name="roomId"
          rules={[{ required: true, message: "Please select a room!" }]}
        >
           <Input placeholder="ID phòng" />
        </Form.Item>
        <Form.Item
          label="User"
          name="userId"
          rules={[{ required: true, message: "Please select a user!" }]}
        >
          <Input placeholder="ID người đánh giá" />
        </Form.Item>
        <Form.Item label="Comment" name="comment" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Rating" name="rating" rules={[{ required: true }]}>
          <Input type="number" min={1} max={5} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateReview;