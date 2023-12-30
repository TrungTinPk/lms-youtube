import express from "express";
import {isAuthenticated, authorizeRoles} from "../middleware/auth";
import { getCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
    '/get-users-analytics',
    authorizeRoles("admin"),
    isAuthenticated,
    getUsersAnalytics
);

analyticsRouter.get(
    '/get-courses-analytics',
    authorizeRoles("admin"),
    isAuthenticated,
    getCoursesAnalytics
);

analyticsRouter.get(
    '/get-orders-analytics',
    authorizeRoles("admin"),
    isAuthenticated,
    getOrderAnalytics
);


export default analyticsRouter;