import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createReview } from "../../../../service/reviewController";
import "./reviews.scss";

const CreateReview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { created, ...reviewData } = values;
      await createReview(reviewData); 
      message.success("Created review successfully!");
      navigate("/admin/review");
    } catch (error) {
      message.error(`Error creating review: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="create-review">
      <h1>Create New Review</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Room ID"
          name="roomId"
          rules={[{ required: true, message: "Please enter a room ID!" }]}
        >
          <Input placeholder="Enter Room ID" />
        </Form.Item>
        <Form.Item
          label="User ID"
          name="userId"
          rules={[{ required: true, message: "Please enter a user ID!" }]}
        >
          <Input placeholder="Enter User ID" />
        </Form.Item>
        <Form.Item
          label="Comment"
          name="comment"
          rules={[{ required: true, message: "Please enter a comment!" }]}
        >
          <Input.TextArea placeholder="Enter your comment here" />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please enter a rating!" }]}
        >
          <Input type="number" min={1} max={5} placeholder="Rating (1-5)" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo đánh giá
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/admin/review")}
          >
            Thoát
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateReview;