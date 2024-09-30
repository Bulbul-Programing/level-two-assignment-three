import express from 'express';
import verifyToken from '../../middleware/verifyToken';
import validateRequest from '../../middleware/validateRequestData';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router()
router.get('/', verifyToken('admin'), bookingController.getAllBookingAdmin)
router.post('/', verifyToken('user'), validateRequest(bookingValidation.createBookingValidationSchema), bookingController.createBooking )
router.get('/user', verifyToken('user'), bookingController.getAllBookingUser)
router.delete('/:bookingId', verifyToken('user'), bookingController.cancelBooking)
router.put('/updateBooing', verifyToken('user'), validateRequest(bookingValidation.updateBookingValidationSchema), bookingController.updateBooking)

export const bookingRouter = router