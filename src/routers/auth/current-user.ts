import { currentUser } from '../../../common'
import { Router, Request, Response, NextFunction } from 'express' 

const router = Router()

router.get('./current-user', currentUser, async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ currentUser: req.currentUser })
})

export { router as currentUserRouter }