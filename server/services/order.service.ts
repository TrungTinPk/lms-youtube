import {CatchAsyncError} from "../middleware/catchAsyncErrors";
import {NextFunction, Response} from "express";
import OrderModel from "../models/order.model";

export const newOrder = CatchAsyncError(async (data: any,next: NextFunction, res: Response) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
        success: true,
        order: order
    })
});


// Get All Orders -- only for admin
export const getAllOrderService = (async (res: Response) => {
    const orders = await OrderModel.find().sort({createdAt: -1});
    res.status(200).json({
        success: true,
        orders
    })
});