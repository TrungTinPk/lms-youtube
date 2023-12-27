import NotificationModel from "../models/notification.model";
import { NextFunction,Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cron from 'node-cron';

// get all notifications --- only admin
export const getAllNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        notifications
    })
});

// update notification --- only admin
export const updateNotification = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {  
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification) {
        return next(new ErrorHandler('Notification not found', 404));
    }else {
        notification.status ? notification.status = 'read' : notification?.status;
    }
    
    await notification.save();
    
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        notifications
    })
});


// delete notification --- only admin
cron.schedule('0 0 * * *', async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);  
    await NotificationModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo } }); 
    console.log('Delete read notifications');
});
