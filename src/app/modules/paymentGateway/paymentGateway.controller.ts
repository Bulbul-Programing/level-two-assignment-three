import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentGatewayService } from "./paymentGateway.service";

const paymentProcess = catchAsync(async (req: Request, res: Response) => {
  const bookingInfo = req.body
  const user = req.user
  
  const result = await paymentGatewayService.paymentProcessIntoDB(user.email,bookingInfo);
  
  res.status(200).json({
    url: result,
  });
});

export const paymentGatewayController = {
    paymentProcess
  };
  
