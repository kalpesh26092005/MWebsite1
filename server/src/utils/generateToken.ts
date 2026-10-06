import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.JWT_SECRET as Secret, {
    expiresIn: config.JWT_EXPIRE,
  } as SignOptions);
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, config.JWT_SECRET as Secret);
};

export const decodeToken = (token: string): jwt.JwtPayload | null => {
  return jwt.decode(token) as jwt.JwtPayload | null;
};