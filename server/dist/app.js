import express, {} from 'express';
import userRoutes from './routes/userRoutes/authRoutes.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`Request Details: - ${req.method} ${req.originalUrl}`);
    next();
});
app.use("/api", userRoutes);
app.listen(3000, () => console.log("server connected"));
//# sourceMappingURL=app.js.map