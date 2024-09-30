import { Types } from 'mongoose';
import { TBooking, TDateAdnTime, TUpdateBooking } from './booking.interface';
import { bookingModel } from './booking.model';
import { userModel } from '../user/user.model';
import AppError from '../../error/AppError';
import { calculateHours } from './booking.utils';
import { facilityModel } from '../Facility/Facility.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchAbleFields } from './bookingConst';
import { TFacility } from '../Facility/Facility.interface';
import timeConflict from '../../utils/timeConflict';

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

  payload.payableAmount = Number(
    (totalHours * isFacilityExist.pricePerHour).toFixed(2),
  );

  const result = await bookingModel.create(payload);
  return result;
};

const getAllBookingAdminIntoDB = async ( query: Record<string, unknown>,) => {
  const bookingQuery = new QueryBuilder(
    bookingModel.find().populate('facility').populate('user'),
    query,
  )
    .searching(bookingSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceFilter()
    .futureField()
  const result = await bookingQuery.modelQuery
  
  return result;
};

const getAllBookingUserIntoDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const bookingQuery = new QueryBuilder(
    bookingModel.find({ user: userId }).populate('facility'),
    query,
  )
    .searching(bookingSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceFilter()
    .futureField()

  // const result = await bookingModel.find({user : userId}).populate('user');
  const result = await bookingQuery.modelQuery;
  if (result.length < 1) {
    throw new AppError(404, 'No data found');
  }
  return result;
};

const cancelBookingIntoDB = async (id: string) => {
  // checking is booking is exist

  const isBookingExist = await bookingModel.findById(id);
  if (!isBookingExist) {
    throw new AppError(404, 'Booking not found');
  }
  const result = await bookingModel.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  );
  return result;
};

const updateBookingIntoDB = async (payload: TUpdateBooking) => {
  const isFacilityExist = await facilityModel.findById(payload.facility);
  if (!isFacilityExist) {
    throw new AppError(404, 'Facility not found');
  }

  if (payload?.date && payload?.startTime && payload?.endTime) {
    const dateAndTime: TDateAdnTime = {
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
    };

    // checking schedule is available in this time
    const existSchedule = await timeConflict(dateAndTime, payload.facility);

    if (existSchedule) {
      throw new AppError(
        500,
        'This facility is not available at that time ! chose another time or day.',
      );
    }

    const totalHours = calculateHours(payload.startTime, payload.endTime);

    payload.payableAmount = Number(
      (totalHours * isFacilityExist.pricePerHour).toFixed(2),
    );

  }
  const result = await bookingModel.findByIdAndUpdate(payload._id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const bookingService = {
  createBookingIntoDB,
  getAllBookingAdminIntoDB,
  getAllBookingUserIntoDB,
  cancelBookingIntoDB,
  updateBookingIntoDB
};
