import Exception from '../exceptions/Exception.js';
import Review from '../models/Review.js';


const listReviews = async ({
    page = 1,
    limit = 10,
    sort = 'createdAt', // Adjust this to the field you want to sort by
    order = 'asc',
    ...filters
}) => {
    try {
        const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const reviews = await Review.find(filters)
            .sort({ [sort]: sortOrder })
            .skip(skip)
            .limit(limitNumber)

        const totalReviews = await Review.countDocuments(filters);
        const totalPages = Math.ceil(totalReviews / limitNumber);
        const hasPreviousPage = pageNumber > 1;
        const hasNextPage = pageNumber < totalPages;

        return {
            reviews,
            totalReviews,
            totalPages,
            currentPage: pageNumber,
            hasPreviousPage,
            hasNextPage,
        };
    } catch (err) {
        throw new Exception(Exception.CANNOT_GET_REVIEW);
    }
};
const findById = async (reviewId) => {
    return await Review.findById(reviewId);
};

export const reviewRepository = {
    listReviews,
    findById,
};