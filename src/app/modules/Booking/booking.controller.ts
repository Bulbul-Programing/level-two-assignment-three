import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { bookingService } from './booking.service';
import { Types } from 'mongoose';
import checkAvailability from '../../utils/checkAvailability';
import { TDateAdnTime } from './booking.interface';
import { facilityModel } from '../Facility/Facility.model';
import AppError from '../../error/AppError';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  // checking facility is existing
  const isFacilityExist = await facilityModel.findById(req.body.facility);

  if (!isFacilityExist) {
    throw new AppError(404, 'Facility not found');
  }

  const dateAndTime: TDateAdnTime = {
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  // checking schedule is available in this time
  const existSchedule = await checkAvailability(dateAndTime, req.body.facility);
  if (existSchedule) {
    throw new AppError(
      500,
      'This facility is not available at that time ! chose another time or day.',
    );
  }

  const result = await bookingService.createBookingIntoDB(user, req.body);

  res.status(200).json({
    success: true,
    massage: 'Booking create successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
};
