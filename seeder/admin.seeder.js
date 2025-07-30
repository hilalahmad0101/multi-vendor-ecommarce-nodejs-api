import UserModel from "../model/User.model.js"
import bcrypt from "bcryptjs";

export const superAdminSeeder = async () => {
    const user = new UserModel({
        name: 'Admin',
        email: 'admin@gmail.com',
        code: '404040',
        password: await bcrypt.hash('admin123', 10),
        tc: true,
        role: 'admin'
    });

    user.save();
}