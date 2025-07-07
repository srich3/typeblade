import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'
import { notFoundHandler } from './middleware/notFoundHandler'
import authRoutes from './routes/auth'
import gameRoutes from './routes/game'
import stripeRoutes from './routes/stripe'
import healthRoutes from './routes/health'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 8080

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env['NODE_ENV'] === 'production' 
    ? ['https://typeblade.app'] 
    : ['http://localhost:3000'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// API Routes
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/game', gameRoutes)
app.use('/api/stripe', stripeRoutes)

// Serve static files from the React app in production
if (process.env['NODE_ENV'] === 'production') {
  // Serve static files from the frontend/dist directory
  const staticPath = path.join(process.cwd(), '../frontend/dist')
  logger.info(`Serving static files from: ${staticPath}`)
  app.use(express.static(staticPath))
  
  // Handle React routing, return all requests to React app
  app.get('*', (_req, res) => {
    const indexPath = path.join(process.cwd(), '../frontend/dist/index.html')
    logger.info(`Serving index.html from: ${indexPath}`)
    res.sendFile(indexPath)
  })
}

// Error handling middleware
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 TypeBlade API server running on port ${PORT}`)
  logger.info(`📊 Environment: ${process.env['NODE_ENV']}`)
})

export default app 