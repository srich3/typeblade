import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  })

  // Don't leak error details in production
  const errorResponse = {
    error: {
      message: statusCode === 500 && process.env['NODE_ENV'] === 'production' 
        ? 'Internal Server Error' 
        : message,
      ...(process.env['NODE_ENV'] !== 'production' && { stack: err.stack })
    }
  }

  res.status(statusCode).json(errorResponse)
} 