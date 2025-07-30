import UserController from "../controllers/user.controller.js"
import { roleAuthMiddleware } from "../middlewares/role.auth.middleware.js";

export const userRoutes = (app) => {
    app.post('/api/user/register', UserController.userRegister);
    app.post('/api/user/email-verification', UserController.emailVerification);
    app.post('/api/user/login', UserController.userLogin);
    app.get('/api/user', roleAuthMiddleware(['user']), UserController.getUser);
    app.post('/api/user/change-password', roleAuthMiddleware, UserController.changePassword);
    app.post('/api/user/forget-password', UserController.forgetPassword);
    app.post('/api/user/reset-password', roleAuthMiddleware, UserController.resetPassword);
}