import { fileURLToPath } from "url";
import express, { type Response, type Request } from 'express';
import userRoutes from './routes/userRoutes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();

const DBURL: string = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/UserManagementSystem";
const PORT: number | string = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.use("/api", userRoutes);
app.use("/api", adminRoutes);

connectDB(DBURL).then(() => app.listen(PORT, () => console.log(`local server connected: success - http://localhost:${PORT} `)))