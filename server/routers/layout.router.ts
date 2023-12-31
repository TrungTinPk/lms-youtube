import express from "express";
import {isAuthenticated, authorizeRoles} from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
const layoutRouter = express.Router();

layoutRouter.post(
    '/create-layout',
    authorizeRoles("admin"),
    isAuthenticated,
    createLayout
);

layoutRouter.put(
    '/edit-layout',
    authorizeRoles("admin"),
    isAuthenticated,
    editLayout
);

layoutRouter.get(
    '/get-layout',
    authorizeRoles("admin"),
    isAuthenticated,
    getLayoutByType
);

export default layoutRouter;