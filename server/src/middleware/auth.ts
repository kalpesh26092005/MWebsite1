import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/generateToken';
import Admin from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
      return;
    }

    const decoded = verifyToken(token) as { id: string };
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Admin not found',
      });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }
    next();
  };
};