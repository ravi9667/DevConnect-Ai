import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorHandler from './middlewares/error.middleware.js';
import notFound from './middlewares/notFound.middleware.js';
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is Running !!",
    })
})
app.use("/api/v1/auth", authRoutes);
app.post("/test", (req, res) => {
    res.json({message: "Test route working"})
})


app.use(notFound)
app.use(errorHandler);

export default app;