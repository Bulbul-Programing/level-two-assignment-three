import { Types } from 'mongoose';
import { TBooking } from './booking.interface';
import { bookingModel } from './booking.model';
import { userModel } from '../user/user.model';
import AppError from '../../error/AppError';
import { calculateHours } from './booking.utils';
import { facilityModel } from '../Facility/Facility.model';

const createBookingIntoDB = async (
  userData: Record<string, unknown>,
  payload: TBooking,
) => {
  // checking user exist
  const user = await userModel.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(404, 'user not found');
  }
  payload.user = user._id;

  // checking facility is existing
  const isFacilityExist = await facilityModel.findById(payload.facility);

  if (!isFacilityExist) {
    throw new AppError(404, 'Facility not found');
  }

  const totalHours = calculateHours(payload.startTime, payload.endTime);
  
  payload.payableAmount = Number((totalHours * isFacilityExist.pricePerHour).toFixed(2))
   
  const result = await bookingModel.create(payload);
  return result;
};

const getAllBookingAdminIntoDB = async () => {
  const result = await bookingModel.find().populate('user').populate('facility');
  if(result.length < 1){
    throw new AppError(404, 'No data found')
  }
  return result;
};

const getAllBookingUserIntoDB = async (userId : string) => {
  const result = await bookingModel.find({user : userId}).populate('user');
  if(result.length < 1){
    throw new AppError(404, 'No data found')
  }
  return result;
};

const cancelBookingIntoDB = async (id: string) => {
  // checking is booking is exist

  const isBookingExist = await bookingModel.findById(id)
  if(!isBookingExist){
    throw new AppError(404, 'Booking not found')
  }
  const result = await bookingModel.findByIdAndUpdate(id, {isBooked : 'canceled'}, {new : true})
  return result
}

export const bookingService = {
  createBookingIntoDB,
  getAllBookingAdminIntoDB,
  getAllBookingUserIntoDB,
  cancelBookingIntoDB
};
