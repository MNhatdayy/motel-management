import express from 'express';
import reviewController from '../src/controller/review.js';

const router = express.Router();

router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.getReviewById);

router.post('/create', reviewController.createReview);

router.put('/update/:id', reviewController.updateReview);

router.delete('/delete/:id', reviewController.deleteReview);

export default router;