import Message from '../models/Message.js';
import User from '../models/User.js';
import { userRepository, messageRepository} from "../repositories/index.js";
import Exception from '../exceptions/Exception.js';

const getAllMessages = async (req, res) => {
    try {
        const { page, limit, sort, order, ...filters } = req.query;

        const messages = await messageRepository.listMessages({
            page: page || 1,
            limit: limit || 10,
            sort: sort || 'createdAt', // Adjust according to your model fields
            order: order || 'asc',
            ...filters,
        });

        res.status(200).json({
            message: 'Lấy danh sách tin nhắn thành công.',
            data: messages,
        });
    } catch (error) {
        res.status(500).json({ message: Exception.MESSAGE_LIST_ERROR });
    }
};

const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('sender_id receive_id');
    if (!message) {
      return res.status(404).json({ message: Exception.MESSAGE_NOT_FOUND });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: Exception.MESSAGE_CREATE_ERROR });
  }
};

const createMessage = async (req, res) => {
  const { sender_id, receive_id, content } = req.body;
  try {
     // Kiểm tra xem người gửi có tồn tại không
     const senderExists = await userRepository.findById(sender_id);
     if (!senderExists) {
       return res.status(404).json({ message: Exception.MESSAGE_USER_NOT_FOUND });
     }
 
     // Kiểm tra xem người nhận có tồn tại không
     const receiverExists = await userRepository.findById(receive_id);
     if (!receiverExists) {
       return res.status(404).json({ message: Exception.MESSAGE_RECEIVER_NOT_FOUND });
     }
     if (sender_id === receive_id) {
        return res.status(400).json({ message:  Exception.MESSAGE_SENDER_RECEIVER_SAME });
      }
  
    const newMessage = new Message({
      sender_id,
      receive_id,
      content,
    });

    const savedMessage = await newMessage.save();
    res.status(200).json({ message: 'Tạo tin nhắn thành công.', data: savedMessage });
  } catch (error) {
    res.status(500).json({ message: Exception.MESSAGE_CREATE_ERROR });
  }
};

const updateMessage = async (req, res) => {
    const { sender_id, receive_id } = req.body;

  try {
    // Kiểm tra xem người gửi có tồn tại không
    const senderExists = await User.findById(sender_id);
    if (!senderExists) {
      return res.status(404).json({ message: Exception.MESSAGE_USER_NOT_FOUND });
    }

    // Kiểm tra xem người nhận có tồn tại không
    const receiverExists = await User.findById(receive_id);
    if (!receiverExists) {
      return res.status(404).json({ message: Exception.MESSAGE_RECEIVER_NOT_FOUND });
    }
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ message: Exception.MESSAGE_NOT_FOUND });
    }
    res.status(200).json({ message: 'Cập nhật tin nhắn thành công.', data: updatedMessage });
  } catch (error) {
    res.status(500).json({ message: Exception.MESSAGE_UPDATE_ERROR });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: Exception.MESSAGE_NOT_FOUND });
    }
    res.status(200).json({ message: 'Xóa tin nhắn thành công.' });
  } catch (error) {
    res.status(500).json({ message: Exception.MESSAGE_DELETE_ERROR });
  }
};

export default {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};