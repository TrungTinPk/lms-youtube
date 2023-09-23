import {ErrorMiddleware} from "./middleware/error";

require('dotenv').config();
import express, {Request, Response, NextFunction} from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Body parse
app.use(express.json({limit: '50mb'}))

//Cookie parse
app.use(cookieParser());

//cors => Cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));

// testing API
    app.get('/test',(req: Request,res: Response,next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working'
    })
});

//unknown root
app.all('*', (req: Request,res: Response,next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found.`) as any;
    err.statusCode = 404;
    next(err);
})

app.use(ErrorMiddleware);