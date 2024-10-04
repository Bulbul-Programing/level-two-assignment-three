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
  const query = req.query
  const result = await userService.getAllUserIntoDB(params, query);
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

const delateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId
  const result = await userService.deleteUserIntoDB(id);
  res.status(200).json({
    success: true,
    massage: 'User delate successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  isExistUser,
  getAllUser,
  delateUser
};
