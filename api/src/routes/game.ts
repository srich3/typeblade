import { Router, Request, Response } from 'express'

const router = Router()

router.post('/session', (req: Request, res: Response) => {
  res.json({ message: 'Create typing session - coming soon' })
})

router.put('/session/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update typing session - coming soon' })
})

router.get('/leaderboard', (req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard - coming soon' })
})

export default router 