import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { checkAvailabilityServer } from "./checkAvailability.service";
import { checkDateFormate } from "./checkAvailability.validation";
import AppError from "../../error/AppError";

const checkAvailability = catchAsync(async(req: Request, res : Response)=>{
    const date = req.query.date as string
    const checkDate = checkDateFormate(date)
    if(!checkDate){
        throw new AppError(500, 'Invalid date format, expected "YYYY-MM-DD"')
    }
    const result = await checkAvailabilityServer.checkAvailabilityIntoDB(date)
    
    res.status(200).json({
        success: true,
        massage: 'Availability checked successfully',
        data: result,
      });
})

export const checkAvailabilityController = {
    checkAvailability
}