import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentGatewayService } from "./paymentGateway.service";
import { TDateAdnTime } from "../Booking/booking.interface";
import timeConflict from "../../utils/timeConflict";
import AppError from "../../error/AppError";

const paymentProcess = catchAsync(async (req: Request, res: Response) => {
  const bookingInfo = req.body
  const user = req.user

  const dateAndTime: TDateAdnTime = {
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  // checking schedule is available in this time
  const existSchedule = await timeConflict(dateAndTime, req.body.facility);

  if (existSchedule) {
    throw new AppError(
      500,
      'This facility is not available at that time ! chose another time or day.',
    );
  }
  
  const result = await paymentGatewayService.paymentProcessIntoDB(user.email,bookingInfo);
  
  res.status(200).json({
    url: result,
  });
});

const redirect = catchAsync(async (req: Request, res: Response) => {
  const params = req.params.path
  res.redirect(`https://assignment-five-three.vercel.app/${params}`)
});

export const paymentGatewayController = {
    paymentProcess,
    redirect
  };
  
