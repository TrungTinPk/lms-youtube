import express from "express";
import {isAuthenticated, authorizeRoles} from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";
const layoutRouter = express.Router();

layoutRouter.post(
    '/create-layout',
    authorizeRoles("admin"),
    isAuthenticated,
    createLayout
);

export default layoutRouter;