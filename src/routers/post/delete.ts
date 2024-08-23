import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/post';
const router = Router()

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;    

    if (!id) {
        const error = new Error("post id is required") as CustomError
        error.status = 400
        next(error)
    }

    let deletedPost;

    try {
        await Post.findOneAndDelete({ _id: id })
    } catch (err) {
        const error = new Error('Post cannot be deleted!') as CustomError
        error.status = 400;
        next(error)
    }

    res.status(200).json( { success: true} )



})

export { router as deletePostRouter }