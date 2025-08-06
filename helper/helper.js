import bcrypt from "bcryptjs"
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { transporter } from "../config/email.config.js";
import multer from "multer";

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

export const errorResponse = (res, status, message) => {
    return res.status(status).json({
        success: false,
        message,
    })
}


export const successResponse = (res, status, message) => {
    return res.status(status).json({
        success: true,
        message,
    })
}

export const dataResponse = (res, status, data, message) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    })
}


export const updateStatus = async (model, id) => {
    const data = await model.findById({ _id: id }).select('status')
    if (!data) {
        return false;
    }

    let status;
    if (data.status === 'Active') {
        status = 'Inactive'
    } else {
        status = "Active"
    }
    await model.findByIdAndUpdate({ _id: id }, {
        status
    });

    return true;
}

export function generateSlug(name) {
    return name
        .toLowerCase()                     // Convert to lowercase
        .trim()                            // Remove leading/trailing whitespace
        .replace(/[^\w\s-]/g, '')          // Remove non-word characters (except spaces and hyphens)
        .replace(/\s+/g, '-')              // Replace spaces with hyphens
        .replace(/-+/g, '-');              // Collapse multiple hyphens
}


// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/'); // upload folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter (optional, only accept images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });