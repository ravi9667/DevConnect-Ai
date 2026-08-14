import mongoose from "mongoose"

const verificationTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        tokenId: {
            type: String,
            required: true,
            unique: true,
        },

        hashedToken: {
            type: String,
            required: true,
            select: false,
        },
        
        type: {
            type: String,
            enum: ["email-verification", "password-reset"],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
        }
    },
    { timestamps: true }
);

export const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);