import winston from 'winston'

const logLevel = process.env["LOG_LEVEL"] || 'info'

// Create transports array
const transports: winston.transport[] = []

// Add console transport for all environments
transports.push(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
}))

// Only add file transports if we're in development and have write permissions
if (process.env['NODE_ENV'] === 'development') {
  try {
    // Test if we can write to logs directory
    const fs = require('fs')
    const path = require('path')
    const logsDir = path.join(process.cwd(), 'logs')
    
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }
    
    transports.push(
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
    )
  } catch (error) {
    // If we can't create the logs directory, just use console logging
    console.warn('Could not create logs directory, using console logging only')
  }
}

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'typeblade-api' },
  transports
}) 