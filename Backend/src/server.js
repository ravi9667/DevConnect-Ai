import "dotenv/config"
import app from "./app.js";
import connectDB from "./config/db.js";
import deleteUnverifiedUsers from "./cron/deleteUnverifiedUsers.cron.js";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        deleteUnverifiedUsers();

        app.listen(PORT, () => {
            console.log(`Server is Running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();