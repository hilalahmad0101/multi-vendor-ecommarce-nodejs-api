import mongoose from "mongoose";

export const connectDB = async (database_url) => {
    try {
        console.log("connection connecting")
        const options = {
            dbname: "auth_db"
        }

        await mongoose.connect(database_url, options)

        console.log("connection successfully")
    } catch (error) {
        console.log(error.message)
    }
}