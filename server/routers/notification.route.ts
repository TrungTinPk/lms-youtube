import { updateNotification } from './../controllers/notification.controller';
import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { getAllNotifications } from "../controllers/notification.controller";
const notificationRouter = express.Router();

notificationRouter.get("/get-all-notifications", isAuthenticated, authorizeRoles("admin"), getAllNotifications);
notificationRouter.put("/update-notification/:id", isAuthenticated, authorizeRoles("admin"), updateNotification);  
export default notificationRouter;