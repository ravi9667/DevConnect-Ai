import cron from "node-cron";
import { User } from "../models/user.model.js";
import { VerificationToken } from "../models/verificationToken.model.js";

const deleteUnverifiedUsers = () => {
    cron.schedule("0 * * * *", async () => {
        console.log("Running Cleanup Job...");

        try {
            const expiredTokens = await VerificationToken.find({
                type: "email-verification",
                expiresAt: {
                    $lt: new Date(),
                },
            })

            for(const token of expiredTokens) {
                await User.findByIdAndDelete(token.user);
                await VerificationToken.findByIdAndDelete(token._id);
            }

            console.log(`${expiredTokens.length} unverified users deleted`);

        } catch(error) {
            console.error("Cron Job Error:", error.message);
        }
    });
};

export default deleteUnverifiedUsers;