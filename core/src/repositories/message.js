import Exception from '../exceptions/Exception.js';
import Message from '../models/Message.js';
const listMessages = async ({
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'asc',
    ...filters
}) => {
    try {
        const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const messages = await Message.find(filters)
            .sort({ [sort]: sortOrder })
            .skip(skip)
            .limit(limitNumber)
            .populate('sender_id receive_id'); // Populate fields as needed

        const totalMessages = await Message.countDocuments(filters);
        const totalPages = Math.ceil(totalMessages / limitNumber);
        const hasPreviousPage = pageNumber > 1;
        const hasNextPage = pageNumber < totalPages;

        return {
            messages,
            totalMessages,
            totalPages,
            currentPage: pageNumber,
            hasPreviousPage,
            hasNextPage,
        };
    } catch (err) {
        throw new Exception(Exception.CANNOT_GET_MESSAGE);
    }
};
export const messageRepository = {
    listMessages,
    // Other methods can be added here
};