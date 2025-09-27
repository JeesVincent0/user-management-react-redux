import express, {} from 'express';
import userRoutes from './routes/userRoutes/authRoutes.js';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
dotenv.config();
const DBURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/UserManagementSystem";
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", userRoutes);
connectDB(DBURL).then(() => app.listen(PORT, () => console.log(`local server connected: success - http://localhost:${PORT} `)));
//# sourceMappingURL=app.js.map