import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: 'admin' | 'user' },
  secret: string,
  expiresIn: string,
) => {
    const token = jwt.sign(jwtPayload, secret, {expiresIn})
    return token
};
