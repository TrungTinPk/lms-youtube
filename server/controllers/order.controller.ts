import {createCourse} from "../services/course.service";

require('dotenv').config();
import {CatchAsyncError} from "../middleware/catchAsyncErrors";
import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../utils/ErrorHandler";
import  cloudinary from 'cloudinary';
import {redis} from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import sendMail from "../utils/sendMail";
import {IOrder} from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import {newOrder} from "../services/order.service";
import ejs from "ejs";

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {courseId, payment_info} = req.body as IOrder;
        const user = await userModel.findById(req.user?._id);
        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);

        if (courseExistInUser) {
            return next(new ErrorHandler('You have already purchased this course', 400));
        }

        const course = await  CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler('Course not found', 400))
        }

        const data: any = {
            courseId: course._id,
            userId: user?._id
        }

        newOrder(data,res, next);

        const mailData = {
            order: {
                _id: course._id.slice(0,6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
            }
        }

        const html = await ejs.renderFile(path.join(__dirname,'../mails/order-confirmation.ejs'), mailData);
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});