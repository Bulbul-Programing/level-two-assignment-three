import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { loginService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await loginService.loginUser(req.body);

  res.status(200).json({
    success: true,
    massage: 'user login successfully',
    token: result.accessToken,
    data : result.userData
  });
});

export const loginController = {
    loginUser
}
