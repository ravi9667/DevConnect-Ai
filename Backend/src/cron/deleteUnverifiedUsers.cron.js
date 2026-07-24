import cron from "node-cron";
import { User } from "../models/user.model";

const deleteUnverifiedUsers = () => {
    cron.schedule("0 * * * *", async () => {
        console.log("Running Cleanup Job...");

        try {
            const result = await User.deleteMany({
                isEmailVerified: false,
                emailVerificationExpires: { $lt: new Date() },
            });

            console.log(`${result.deletedCount} unverified users deleted`);
        } catch(error) {
            console.error("Cron Job Error:", error.message);
        }
    });
};

export default deleteUnverifiedUsers;