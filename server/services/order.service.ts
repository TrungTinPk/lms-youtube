import {CatchAsyncError} from "../middleware/catchAsyncErrors";
import {NextFunction, Response} from "express";
import OrderModel from "../models/order.model";

export const newOrder = CatchAsyncError(async (data: any,next: NextFunction) => {
    const order = await OrderModel.create(data);
    next(order);
});