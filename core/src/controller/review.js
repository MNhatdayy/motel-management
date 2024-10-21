import Review from '../models/Review.js';
import User from '../models/User.js';
import Room from '../models/Room.js';
import { userRepository,roomRepository,reviewRepository } from "../repositories/index.js";
import Exception from '../exceptions/Exception.js';

const getAllReviews = async (req, res) => {
    try {
        const { page, limit, sort, order, ...filters } = req.query;

        const reviews = await reviewRepository.listReviews({
            page: page || 1,
            limit: limit || 5,
            sort: sort || 'createdAt', // Adjust according to your model fields
            order: order || 'asc',
            ...filters,
        });

        res.status(200).json({
            message: 'Lấy danh sách đánh giá thành công.',
            data: reviews,
        });
    } catch (error) {
        res.status(500).json({ message: Exception.REVIEW_LIST_ERROR });
    }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: Exception.REVIEW_NOT_FOUND });
    res.status(200).json(review );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  const { roomId, userId, rating, comment } = req.body;

  try {
     // Kiểm tra xem phòng có tồn tại không
     const roomExists = await roomRepository.getById(roomId);
     if (!roomExists) {
      throw new Exception(Exception.ROOM_EXITS);
    }
    // Kiểm tra xem người dùng có tồn tại không
    const userExists = await userRepository.getById(userId);
    if (!userExists) {
      throw new Exception(Exception.USER_EXITS);
    }

    // Tạo đánh giá mới
    const newReview = new Review({
      roomId,
      userId,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    res.status(200).json({ message: 'Tạo đánh giá thành công.', data: savedReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateReview = async (req, res) => {
  const { roomId, userId } = req.body;

  try {
    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: Exception.USER_EXITS });
    const roomExists = await Room.findById(roomId);
    if (!roomExists) return res.status(404).json({ message: Exception.USER_EXITS });

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: Exception.REVIEW_NOT_FOUND });

    res.status(200).json({ message: 'Cập nhật đánh giá thành công.', data: updatedReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: Exception.REVIEW_NOT_FOUND });
    res.status(200).json({ message: 'Xóa đánh giá thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};