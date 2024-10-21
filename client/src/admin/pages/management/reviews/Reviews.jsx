import { useEffect, useState } from "react";
import "./reviews.scss";
import { Table, Button, Space, Pagination, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteReview,
  fetchReviews,
} from "../../../../service/reviewController";
import { getUserById } from "../../../../service/userController"; // Import user fetching service
import DeleteModal from "../../../components/DeleteComponent";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  const getReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReviews({
        page,
        limit: pageSize,
        sort: sortField,
        order: sortOrder,
      });
      setReviews(data.data.reviews);
      setTotalPages(data.data.totalPages);
      const userNames = {};
            for (const review of data.data.reviews){
                if(review.userId && !users[review.userId]){
                    const user = await getUserById(review.userId);
                    userNames[review.userId] = user.name;
                }
            }
      setUsers((prevUsers) => ({ ...prevUsers, ...userNames }));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [page, sortField, sortOrder]);

  const showModal = (id) => {
    setReviewIdDelete(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await deleteReview(reviewIdToDelete);
      message.success("Deleted review successfully!");
      setIsModalOpen(false);
      setReviewIdDelete(null);
      getReviews();
    } catch (err) {
      message.error(`Error deleting review: ${err.message}`);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setReviewIdDelete(null);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const order = sorter.order === "ascend" ? "asc" : "desc";
    setSortField(sorter.field);
    setSortOrder(order);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => users[userId] ? users[userId] : "Loading...",
    },
    {
      title: "Room ID",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Created At",
      dataIndex: "created",
      key: "created",
      render: (date) => new Date(date).toLocaleString(), // Format the date
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`../review/update/${record._id}`)}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => showModal(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching reviews: {error}</div>;

  return (
    <div className="reviews">
      <h1 className="title">Review Management</h1>
      <Button type="primary" className="create-btn">
        <Link to="/admin/review/create">Create Review</Link>
      </Button>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        pagination={false}
        onChange={handleTableChange}
      />
      <Pagination
        current={page}
        total={totalPages * pageSize}
        pageSize={pageSize}
        onChange={(page) => setPage(page)}
        onShowSizeChange={(current, size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
      <DeleteModal
        show={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleOk}
      />
    </div>
  );
};

export default Reviews;