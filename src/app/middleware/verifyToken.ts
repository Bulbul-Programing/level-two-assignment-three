import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { isUserExist } from '../utils/isUserExist';
import AppError from '../error/AppError';

const verifyToken = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.accessTokenSecrete as string,
    ) as JwtPayload;

    const { email, role, iat } = decoded;
    const user = await isUserExist(email);

    if (!user) {
      throw new AppError(404, 'user not found!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You have no access to this route!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default verifyToken;
