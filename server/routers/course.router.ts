import express from "express";
import {isAuthenticated} from "../middleware/auth";
import {
    addAnswer,
    addQuestion, addReplyToReview, addReview,
    editCourse,
    getAllCourses, getCourseByUser,
    getSingleCourse,
    uploadCourse
} from "../controllers/course.controller";
import {authorizeRoles} from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post(
    '/create-course',
    isAuthenticated,
    authorizeRoles('admin'),
    uploadCourse
);

courseRouter.put(
    '/edit-course/:id',
    isAuthenticated,
    authorizeRoles('admin'),
    editCourse
);

courseRouter.get(
    '/get-course/:id',
    getSingleCourse
);

courseRouter.get(
    '/get-courses',
    getAllCourses
);

courseRouter.get(
    '/get-course-content/:id',
    getCourseByUser
);

courseRouter.put(
    '/add-question',
    isAuthenticated,
    addQuestion
);

courseRouter.put(
    '/add-answer',
    isAuthenticated,
    addAnswer
);

courseRouter.put(
    '/add-review/:id',
    isAuthenticated,
    addReview
);

courseRouter.put(
    '/add-reply/:id',
    isAuthenticated,
    authorizeRoles('admin'),
    addReplyToReview
);
export default courseRouter;