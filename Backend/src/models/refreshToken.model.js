import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        refreshToken: {
            type: String,
            required: true,
            select: false,
        },

        refreshTokenExpiresAt: {
            type: Date,
            required: true,
        },

        clientInfo: {
            type: String,
            default: "Unknown Device",
        },

        // jti: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     index: true,
        // },
    },
    { timestamps: true }
);

export const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);