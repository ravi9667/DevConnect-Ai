import mongoose from "mongoose";
import { required } from "zod/mini";

const loginOtpSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        otp: {
            type: String,
            required: true,
            select: false,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true}
);

export const LoginOtp = mongoose.model("LoginOtp", loginOtpSchema);