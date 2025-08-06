import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { connectDB } from './config/connectdb.js';
import { userRoutes } from './routes/user.routes.js';
import { adminRoutes } from './routes/admin/admin.routes.js';
const app = express();
app.use('/uploads', express.static('uploads'));
const port = process.env.PORT;
const database_url = process.env.DATABASE_URL;

app.use(cors())
app.use(express.json())
connectDB(database_url)
userRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})