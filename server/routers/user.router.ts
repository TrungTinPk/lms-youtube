import express from "express";
import {activateUser, authorizeRoles, loginUser, logoutUser, registrationUser} from "../controllers/user.controller";
import {isAuthenticated} from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.post('/logout-user', isAuthenticated, logoutUser);
export default userRouter;