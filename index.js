import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { connectDB } from './config/connectdb.js';
import { userRoutes } from './routes/user.routes.js';
const app = express();

const port = process.env.PORT;
const database_url = process.env.DATABASE_URL;

app.use(cors())
app.use(express.json())
connectDB(database_url)
userRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})