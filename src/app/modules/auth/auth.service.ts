import config from '../../config';
import AppError from '../../error/AppError';
import { isPasswordMatched } from '../../utils/isPasswordMatch';
import { isUserExist } from '../../utils/isUserExist';
import { userModel } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLogin) => {
  const isExistUser = await isUserExist(payload.email);
  
  if (!isExistUser) {
    throw new AppError(403, 'user not found');
  }

  const isPasswordMatch = await isPasswordMatched(
    payload.password,
    isExistUser.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(403, 'Password do not matched');
  }

  const userData = await userModel.findOne({email : payload.email}).select({password: 0})
  
  const jwtPayload = {
    userId : isExistUser._id,
    email: isExistUser.email,
    role: isExistUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.accessTokenSecrete as string,
    config.accessTokenExpire as string,
  );

  return {accessToken, userData}
};

const getUserDataIntoDB = async(email : string) => {
  const result = await userModel.findOne({email}).select({password : 0})
  return result
}

export const loginService = {
  loginUser,
  getUserDataIntoDB
};
