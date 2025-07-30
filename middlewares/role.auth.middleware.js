import { verifyJWT } from "../helper/helper.js";
import TokenModel from "../model/Token.model.js";
import UserModel from "../model/User.model.js";

export const roleAuthMiddleware = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;

            if (!authorization || !authorization.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }

            const token = authorization.split(' ')[1];

            const checkToken = await TokenModel.findOne({ token });
            if (!checkToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }

            const { user } = await verifyJWT(token);
            const foundUser = await UserModel.findById(user.id).select('-password');

            if (!foundUser || !allowedRoles.includes(foundUser.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Access denied'
                });
            }

            req.user = foundUser;
            next();
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    };
};
