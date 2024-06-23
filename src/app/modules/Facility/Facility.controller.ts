import { Request, Response } from 'express';
import { facilityService } from './Facility.service';
import catchAsync from '../../utils/catchAsync';

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await facilityService.creteFacilityIntoDB(req.body);

  res.status(200).json({
    success: true,
    massage: 'Facility added successfully',
    data: result,
  });
});

export const facilityController = {
  createFacility,
};
