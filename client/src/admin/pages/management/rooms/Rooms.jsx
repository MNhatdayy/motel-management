import { useEffect, useState } from "react";
import "./rooms.scss";
import { Table, Button, Space, Pagination, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { deleteRoom, fetchRooms } from "../../../../service/roomController";
import { getUserById } from "../../../../service/userController";
import DeleteModal from "../../../components/DeleteComponent";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [owners, setOwners] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomIdToDelete, setRoomIdDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  const getRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRooms({
        page,
        sort: sortField,
        order: sortOrder,
      });
      setRooms(data.data.rooms);
      console.log(data.data.rooms);

      setTotalPages(data.data.totalPages);
      const ownerNames = {};
      for (const room of data.data.rooms) {
        if (room.owner_id && !owners[room.owner_id]) {
          const owner = await getUserById(room.owner_id);
          ownerNames[room.owner_id] = owner.name; // Lưu tên của chủ sở hữu vào object owners
        }
      }

      setOwners((prevOwners) => ({ ...prevOwners, ...ownerNames }));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getRooms();
  }, [page, sortField, sortOrder]);

  const showModal = (id) => {
    setRoomIdDelete(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    try {
      deleteRoom(roomIdToDelete);
      message.success("Xóa người dùng thành công!");
      setIsModalOpen(false);
      setRoomIdDelete(null);
      getRooms();
    } catch (err) {
      message.error("Lỗi khi xóa người dùng", err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRoomIdDelete(null);
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
      title: "Chủ sở hữu",
      dataIndex: "owner_id",
      key: "owner_id",
      render: (owner_id) =>
        owners[owner_id] ? owners[owner_id] : "Loading...",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        if (image) {
          return (
            <img src={image} alt="Room" style={{ width: 100, height: 100 }} />
          );
        }
        return <span>Không có hình ảnh</span>;
      },
    },
    {
      title: "địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "diện tích",
      dataIndex: "size",
      key: "size",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Trạng thái",
      dataIndex: "available",
      key: "available",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      render: (text) => (text ? "Còn trống" : "Đã hết"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`../room/update/${record._id}`)}
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
  if (error) return <div>Error fetching rooms: {error}</div>;
  return (
    <div className="rooms">
      <h1 className="title">ROOM MANAGEMENT</h1>
      <Button type="primary" className="create-btn">
        <Link to="/admin/room/create">Create</Link>
      </Button>
      <Table
        columns={columns}
        dataSource={rooms}
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

export default Rooms;
