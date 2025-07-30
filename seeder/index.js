import { connectDB } from '../config/connectdb.js'
import dotenv from 'dotenv'
import { superAdminSeeder } from './admin.seeder.js';
dotenv.config()
const database_url = process.env.DATABASE_URL;
connectDB(database_url);
superAdminSeeder();