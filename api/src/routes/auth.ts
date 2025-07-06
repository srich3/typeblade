import { Router, Request, Response } from 'express'

const router = Router()

router.post('/login', (_req: Request, res: Response) => {
  res.json({ message: 'Login endpoint - coming soon' })
})

router.post('/register', (_req: Request, res: Response) => {
  res.json({ message: 'Register endpoint - coming soon' })
})

router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logout endpoint - coming soon' })
})

export default router 