import express from 'express';
import BookingController from '../src/controller/booking.js';

const router = express.Router();

router.get('/', BookingController.getAllBookings);

router.get('/:id', BookingController.getBookingById);

router.post('/create', BookingController.createBooking);

router.put('/update/:id', BookingController.updateBooking);

router.delete('/delete/:id', BookingController.deleteBooking);

export default router;