import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { checkAvailabilityServer } from "./checkAvailability.service";
import { checkDateFormate } from "./checkAvailability.validation";

const checkAvailability = catchAsync(async(req: Request, res : Response)=>{
    const date = req.query.date as string
    const checkDate = checkDateFormate(date)
    
    const result = await checkAvailabilityServer.checkAvailabilityIntoDB(date)
})

export const checkAvailabilityController = {
    checkAvailability
}