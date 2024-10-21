import "./bookings.scss";
import { deleteBooking, fetchBookings, updateBooking } from '../../../../service/bookingController';
import { useEffect, useState } from "react";
import { Table, Button, Space, Pagination, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { getUserById } from "../../../../service/userController";
import DeleteModal from "../../../components/DeleteComponent";
import UpdateModal from "../../../components/UpdateComponent";
const Bookings = () => {
	const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingIdToDelete, setBookingIdDelete] = useState(null);
    const [users, setUsers] = useState({});
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [pageSize, setPageSize] = useState(5);
    const [bookingIdToUpdate, setBookingIdToUpdate] = useState(null); 
    const [statusToUpdate, setStatusToUpdate] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const navigate = useNavigate();
    
    const getBookings = async () =>{
        setLoading(true);
        setError(null);
        try {
            const data = await fetchBookings({
                page,
                sort: sortField,
                order: sortOrder,
            });
            setBookings(data.data.bookings);
            console.log(data.data.bookings);

            setTotalPages(data.data.totalPages);
            const userNames = {};
            for (const booking of data.data.bookings){
                if(booking.userId && !users[booking.userId]){
                    const user = await getUserById(booking.userId);
                    userNames[booking.userId] = user.name;
                }
            }
            setUsers((prevUsers) => ({ ...prevUsers, ...userNames }));
            setLoading(false);
        }catch(err){
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(()=>{
        getBookings();
    }, [page, sortField,sortOrder]);
    

    const showModal = (id) => {
        setBookingIdDelete(id);
        setIsModalOpen(true);
    };
    const showUpdateModal = (id, currentStatus) => {
        setBookingIdToUpdate(id);
        setStatusToUpdate(currentStatus);
        setIsUpdateModalOpen(true);
      };
    const handleOk = async () => {
        try {
            await deleteBooking(bookingIdToDelete);
            message.success("xóa đặt phòng thanh công!");
            setIsModalOpen(false);
            setBookingIdDelete(null);
            setBookings();
        } catch(err){
            message.error(`lỗi xóa đặt phòng:${err.message}`);
        }
    };
    const handleCancel = () =>{
        setIsModalOpen(false);
        setBookingIdDelete(null);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        const order = sorter.order === "ascend" ? "asc" : "desc";
        setSortField(sorter.field);
        setSortOrder(order);
    };
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false);
        setBookingIdToUpdate(null);
      };
    const handleUpdate = async () => {
        try {
          await updateBooking(bookingIdToUpdate, { status: true });
          message.success("Cập nhật trạng thái đặt phòng thành công!");

          setIsUpdateModalOpen(false);
          setBookingIdToUpdate(null);
          getBookings(); // Refresh bookings after update
        } catch (err) {
          message.error(`Lỗi cập nhật đặt phòng: ${err.message}`);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title:"Mã phòng",
            dataIndex: "roomId",
            key:"roomId",
        },
        {
            title: "Người đặt phòng",
            dataIndex: "userId",
            key:" userId",
            render: (userId) =>
                users[userId] ? users[userId] : "Loading....",
            sorter: true,
            sortDirections: ["ascend", "descend"]
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            key: "startDate",
            render: (startDate) => new Date(startDate).toLocaleDateString(),
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            key: "endDate",
            render: (endDate) => new Date(endDate).toLocaleDateString(),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (status ? "Đã xác nhận" : "Chưa xác nhận"),
        },
        {
            title: "Ngày tạo",
            dataIndex: "created",
            key: "created",
            render: (created) => new Date(created).toLocaleDateString(),
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              {!record.status && (
                <Button
                  type="primary"
                  onClick={() => showUpdateModal(record._id, record.status)}
                >
                  Edit
                </Button>,
                <Button type="danger" onClick={() => showModal(record._id)}>
                  Delete
                </Button>
                
              )}
              
            </Space>
          ),
       },
    ]
    

    if (loading) return <div>Loading...</div>;
    if(error) return <div>Error fetching booking: {error}</div>;
    return (
        <div className="bookings">
            <h1 className="title">BOOKING MANAGEMENT</h1>
      <Table
        columns={columns}
        dataSource={bookings}
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
      <UpdateModal
        show={isUpdateModalOpen}
        onCancel={handleUpdateCancel}
        onConfirm={handleUpdate}
        statusToUpdate={statusToUpdate}
        setStatusToUpdate={setStatusToUpdate}
      />
        </div>
    );

};

export default Bookings;