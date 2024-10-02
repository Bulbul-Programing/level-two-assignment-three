import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import { emit } from 'process';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createNewUserIntoDB(req.body);
  res.status(200).json({
    success: true,
    massage: 'User registered successfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const params = req.params.role
  const result = await userService.getAllUserIntoDB(params);
  res.status(200).json({
    success: true,
    massage: 'User retrieve successfully',
    data: result,
  });
});

const isExistUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  const result = await userService.isExistUserIntoDB(email);
  res.status(200).json({
    success: true,
    massage: 'User exists',
    data: result,
  });
});

export const userController = {
  createUser,
  isExistUser,
  getAllUser
};
