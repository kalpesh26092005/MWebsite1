import { Response } from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import { AuthRequest } from '../middleware/auth';
import { generateToken } from '../utils/generateToken';
import { config } from '../config/env';
import { AppError } from '../middleware/errorHandler';

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email });

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const admin = await Admin.findOne({ email }).select('+password');
    console.log('👤 Admin found:', admin ? { id: admin._id, email: admin.email, hasPassword: !!admin.password } : null);

    if (!admin) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await admin.comparePassword(password);
    console.log('🔑 Password match:', isMatch);

    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({ id: admin._id });

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          isFirstLogin: admin.isFirstLogin,
        },
        token,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Login failed', 500);
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    throw new AppError('Failed to get admin profile', 500);
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError('Please provide current and new password', 400);
    }

    if (newPassword.length < 8) {
      throw new AppError('New password must be at least 8 characters', 400);
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError('Current password is incorrect', 401);
    }

    admin.password = newPassword;
    admin.isFirstLogin = false;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to change password', 500);
  }
};