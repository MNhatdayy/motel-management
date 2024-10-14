import { useState, useEffect } from "react";
import { Table, Button, Space, Pagination, message } from "antd";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/DeleteComponent";
import { fetchUsers, deleteUser } from "../../../../service/userController";
import "./users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers({
        page,
        sort: sortField,
        order: sortOrder,
      });
      setUsers(data.data.users);
      setTotalPages(data.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, [page, sortField, sortOrder]);

  const showModal = (id) => {
    setUserIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    try {
      deleteUser(userIdToDelete); // Xóa người dùng
      message.success("Xóa người dùng thành công!"); // Hiển thị thông báo thành công
      setIsModalOpen(false);
      setUserIdToDelete(null);
      getUsers(); // Tải lại danh sách người dùng
    } catch (err) {
      message.error("Lỗi khi xóa người dùng", err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`../user/update/${record._id}`)}
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
  if (error) return <div>Error fetching users: {error}</div>;

  return (
    <div className="users">
      <h1 className="title">USER MANAGEMENT</h1>
      {/* <Button type="primary" className="create-btn">
        <Link to="/admin/user/create">Create User</Link>
      </Button> */}
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={false}
        onChange={handleTableChange}
      />
      <Pagination
        className="pagi"
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

export default Users;
