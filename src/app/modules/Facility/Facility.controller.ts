import { Request, Response } from 'express';
import { facilityService } from './Facility.service';
import catchAsync from '../../utils/catchAsync';

const getAllFacility = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const result = await facilityService.getAllFacilityIntoDb(query);

  res.status(200).json({
    success: true,
    massage: 'Facility retrieved successfully',
    data: result,
  });
});

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await facilityService.creteFacilityIntoDB(req.body);

  res.status(200).json({
    success: true,
    massage: 'Facility added successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const { facilityId } = req.params;
  const result = await facilityService.updateFacilityIntoDB(
    facilityId,
    req.body,
  );

  res.status(200).json({
    success: true,
    massage: 'Facility update successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { facilityId } = req.params;
  const result = await facilityService.deleteFacilityIntoDB(facilityId);

  res.status(200).json({
    success: true,
    massage: 'Facility delete successfully',
    data: result,
  });
});

export const facilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility
};
