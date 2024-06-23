import { Types } from 'mongoose';
import { TBooking } from './booking.interface';
import { bookingModel } from './booking.model';
import { userModel } from '../user/user.model';
import AppError from '../../error/AppError';

const createBookingIntoDB = async (
  userId: Record<string, unknown>,
  payload: TBooking,
) => {
  const user = await userModel.findOne({ email: userId.email });

  if (!user) {
    throw new AppError(404, 'user not found');
  }

  payload.user = user._id;

  const result = await bookingModel.create(payload);
  return result;
};

export const bookingService = {
  createBookingIntoDB,
};
