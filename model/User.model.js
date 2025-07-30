import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    code: { type: Number, required: true, trim: true },
    isVerified: { type: Boolean, required: true, default: 0 },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, default: 'user' },
    tc: { type: Boolean, required: true },
}, {
    timestamps: true
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;