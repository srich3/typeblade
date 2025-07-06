import { Router, Request, Response } from 'express'

const router = Router()

router.post('/session', (_req: Request, res: Response) => {
  res.json({ message: 'Create typing session - coming soon' })
})

router.put('/session/:id', (_req: Request, res: Response) => {
  res.json({ message: 'Update typing session - coming soon' })
})

router.get('/leaderboard', (_req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard - coming soon' })
})

export default router 