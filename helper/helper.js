import bcrypt from "bcryptjs"
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { transporter } from "../config/email.config.js";
config();

export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(8);

    const hash_password = await bcrypt.hash(password, salt);
    return hash_password;
}

export const verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

export const generateJWT = async (user) => {
    user = {
        name: user.name,
        email: user.email,
        tc: user.tc,
        id: user._id
    }
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '1d' });
}

export const verifyJWT = async (token) => {
    return jwt.verify(token, process.env.SECRET);
}

export const sendEmailVerification = async (from, to, subject, text) => {
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
    });
    return info.messageId;
}