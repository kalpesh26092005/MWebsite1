import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(e => e.message);
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
    return;
  }

  // Mongoose duplicate key error
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
    return;
  }

  // Mongoose bad ObjectId
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: 'Invalid resource ID',
    });
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      message: 'Token expired',
    });
    return;
  }

  // Default error
  const statusCode = (err as AppError).statusCode || 500;
  const message = (err as AppError).isOperational ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};