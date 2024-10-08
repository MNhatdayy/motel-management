import Exception from '../exceptions/Exception.js';
import Booking from '../models/Booking.js';
import { userRepository,roomRepository, bookingRepository } from "../repositories/index.js";

const getAllBookings = async (req, res) => {
    try {
        const { page, limit, sort, order, ...filters } = req.query;

        const bookings = await bookingRepository.listBookings({
            page: page || 1,
            limit: limit || 5,
            sort: sort || 'createdAt', // Adjust according to your model fields
            order: order || 'asc',
            ...filters,
        });

        res.status(200).json({
            message: 'Lấy danh sách booking thành công.',
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({ message: Exception.BOOKING_LIST });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('roomId userId');
        if (!booking) 
        {
            throw new Exception(Exception.BOOKING_EXITS);
        }
     
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: Exception.BOOKING_EXITS });
    }
};


const createBooking = async (req, res) => {
    const { roomId, userId, startDate, endDate, status } = req.body;

    try {
        // Kiểm tra xem người dùng có tồn tại hay không
        const userExists = await userRepository.findById(userId); 
        if (!userExists) {
           throw new Exception(Exception.USER_EXITS);
        }

        // Kiểm tra xem phòng có tồn tại hay không
        const roomExists = await roomRepository.findById(roomId); 
        if (!roomExists) {
            throw new Exception(Exception.ROOM_EXITS);
        }

        const bookingExists = await Booking.findOne({ roomId, userId });
        // Nếu booking đã tồn tại, trả về lỗi
        if (bookingExists) {
            throw new Exception(Exception.BOOKING_EXITS);
        }

        // Tạo booking mới
        const newBooking = new Booking({
            roomId,
            userId,
            startDate,
            endDate,
            status
        });

        const savedBooking = await newBooking.save();
        res.status(200).json({ message: 'Tạo booking thành công', data: savedBooking });
    } catch (error) {
        res.status(500).json({ message:"lỗi" });
    }
};

const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if (!updatedBooking) {
            throw new Exception(Exception.BOOKING_NOTFOUND);
        }
        res.status(200).json({
            message: "cập nhật thành công",
            updatedBooking
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking){
            throw new Exception(Exception.BOOKING_NOTFOUND);
        }
        res.status(200).json({
            message: "xóa thành công",
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};