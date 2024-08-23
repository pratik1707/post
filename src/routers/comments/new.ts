import { Router, Request, Response, NextFunction } from 'express';
import Comment from '../../models/comment'
import Post from '../../models/post'
const router = Router()

router.post('/api/comment/new/:postId', async (req: Request, res: Response, next: NextFunction) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    const { userName, content} = req.body;
    const { postId } = req.params;

    if (!content) {
        const error = new Error('content is required!') as CustomError
        error.status = 400 
        next(error)
    }

    const newComment = new Comment({
        userName: userName ? userName : 'anonymous', 
        content
    })

    await newComment.save()

    const updatedPost = await Post.findOneAndUpdate( 
        {_id: postId},
        { $push: {comments: newComment }},
        { new: true }
    )

    res.status(201).send(newComment)

})

export {router as newCommentRouter}