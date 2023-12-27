import express from "express";
import {
    activateUser,
    getAllUsers, getUserInfo,
    loginUser,
    logoutUser,
    registrationUser, socialAuth,
    updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo
} from "../controllers/user.controller";
import {authorizeRoles, isAuthenticated} from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);
userRouter.get('/refresh', updateAccessToken);
userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.post('/social-auth', socialAuth);
userRouter.post('/update-user-info', isAuthenticated, updateUserInfo);
userRouter.post('/update-user-password', isAuthenticated, updatePassword);
userRouter.post('/update-user-avatar', isAuthenticated, updateProfilePicture);
userRouter.get('/get-users', isAuthenticated, authorizeRoles("admin"), getAllUsers);
export default userRouter;