import * as dotenv from 'dotenv'
dotenv.config();
import express, { Request, Response, NextFunction } from 'express'
import {json, urlencoded} from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieSession from 'cookie-session';

import {
    newPostRouter, deletePostRouter, updatePostRouter, showPostRouter,
    newCommentRouter, deleteCommentRouter
} from './routers/index'

const app = express()

app.set('trust proxy', true);

app.use(urlencoded({
    extended: false
}))

app.use(json())

app.use(cookieSession({
    signed: false, 
    secure: false 
}))

app.use(cors(
    {
        origin: "*",
        optionsSuccessStatus: 200
    }
))



app.use(newPostRouter)
app.use(deletePostRouter)
app.use(updatePostRouter)
app.use(showPostRouter)

app.use(newCommentRouter)
app.use(deleteCommentRouter)

app.all('*', (req, res, next) => {
    const error = new Error('Not Found!') as CustomError
    error.status = 404
    next(error)
})

declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message })
    }

    res.status(500).json({ message: 'Something went wrong' })
})

const start = async () => {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required')

    if (!process.env.JWT_KEY) throw new Error('JWT_KEY is required')    
        
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        throw new Error('database error')
    }
    app.listen(8080, () => console.log("server is up and ruinning at 8080"))

}

start()

