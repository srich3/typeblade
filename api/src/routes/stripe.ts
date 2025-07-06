import { Router, Request, Response } from 'express'

const router = Router()

router.post('/webhook', (req: Request, res: Response) => {
  res.json({ message: 'Stripe webhook - coming soon' })
})

router.post('/create-checkout-session', (req: Request, res: Response) => {
  res.json({ message: 'Create checkout session - coming soon' })
})

export default router 