import { generateJWT, hashedPassword, sendEmailVerification, verifyPassword } from "../helper/helper.js";
import TokenModel from "../model/Token.model.js";
import UserModel from "../model/User.model.js";


class UserController {
    static userRegister = async (req, res) => {
        try {
            const { name, email, password, password_confirmation, tc } = req.body;
            const user = await UserModel.findOne({ email });

            if (user) {
                return res.status(422).json({
                    success: false,
                    message: 'Email already be taken'
                })
            }

            if (password !== password_confirmation) {
                return res.status(422).json({
                    success: false,
                    message: 'Password confirmation is not same'
                })
            }
            const code = Math.floor(Math.random() * 100000);
            const hash_password = await hashedPassword(password);
            const newUser = new UserModel({
                name: name,
                email: email,
                code: code,
                password: hash_password,
                tc: tc
            });
            await newUser.save();
            await sendEmailVerification(process.env.MAIL_FROM_ADDRESS, email, 'Email verification', 'Your email verification code is ' + code)
            return res.status(201).json({
                success: true,
                message: 'Registration successfully'
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    };


    static emailVerification = async (req, res) => {
        try {
            const { code, reset_password } = req.body;

            const user = await UserModel.findOne({ code });
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid verification code'
                });
            }

            const now = new Date();
            const otpTime = user.updatedAt;
            const expiryTime = new Date(otpTime.getTime() + 60 * 1000);

            if (now > expiryTime) {
                return res.status(422).json({
                    success: false,
                    message: 'otp is expired'
                })
            }

            user.code = 0;
            user.isVerified = 1;
            user.save();

            if (reset_password) {
                await TokenModel.deleteMany({ user: user.id })
                const token = await generateJWT(user);
                const newToken = new TokenModel({
                    user: user.id,
                    token,
                });
                await newToken.save();
                return res.status(200).json({
                    success: true,
                    token,
                    message: 'email verified successfully'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'email verified successfully'
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid email and password'
                })
            }

            const isMatchPassword = await verifyPassword(password, user.password);
            if (!isMatchPassword) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid email and password'
                })
            }
            if (!user.isVerified) {
                return res.status(400).json({
                    success: false,
                    message: 'Account is not verified'
                })
            }
            await TokenModel.deleteMany({ user: user.id })
            const token = await generateJWT(user);
            const newToken = new TokenModel({
                user: user.id,
                token,
            });
            await newToken.save();
            return res.status(200).json({
                token,
                success: true,
                message: 'Login successfully'
            })
        } catch (e) {
            return res.status(200).json({
                success: false,
                message: e.message
            });
        }
    };


    static getUser = async (req, res) => {
        try {
            const user = req.user;
            return res.status(200).json({
                success: true,
                user,
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }


    static changePassword = async (req, res) => {
        try {
            const { old_password, password, password_confirmation } = req.body;

            if (password !== password_confirmation) {
                return res.status(404).json({
                    success: false,
                    message: 'the password confirmation is not matched'
                });
            }

            const user = await UserModel.findOne({ _id: req.user.id });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'user not found'
                });
            }
            const verify_password = await verifyPassword(old_password, user.password);

            if (!verify_password) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid old password'
                });
            }

            const hash_password = await hashedPassword(password);

            user.password = hash_password;
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'password change successfully'
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }

    static forgetPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }
            const code = Math.floor(Math.random() * 100000);
            await sendEmailVerification(process.env.MAIL_FROM_ADDRESS, user.email, 'Email verification', 'Your email verification code is ' + code)
            user.code = code;
            user.isVerified = 0;
            user.save();

            return res.status(200).json({
                success: true,
                message: 'Verification code is sended on your email'
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }

    static resetPassword = async (req, res) => {
        try {
            const { password, password_confirmation } = req.body;

            if (password !== password_confirmation) {
                return res.status(404).json({
                    success: false,
                    message: 'the password confirmation is not matched'
                });
            }

            const user = await UserModel.findOne({ _id: req.user.id });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'user not found'
                });
            }

            const hash_password = await hashedPassword(password);

            user.password = hash_password;
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'password reset successfully'
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }
}

export default UserController;