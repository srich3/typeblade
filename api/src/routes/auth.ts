import { Router, Request, Response } from 'express'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  res.json({ message: 'Login endpoint - coming soon' })
})

router.post('/register', (req: Request, res: Response) => {
  res.json({ message: 'Register endpoint - coming soon' })
})

router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logout endpoint - coming soon' })
})

export default router 