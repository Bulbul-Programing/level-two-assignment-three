import express from 'express';
import verifyToken from '../../middleware/verifyToken';
import validateRequest from '../../middleware/validateRequestData';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router()

router.post('/', verifyToken('user'), validateRequest(bookingValidation.createBookingValidationSchema), bookingController.createBooking )

export const bookingRouter = router