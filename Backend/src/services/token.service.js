import { RefreshToken } from "../models/refreshToken.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApiError from "../utils/ApiError.js";
import crypto from 'crypto';


export const saveRefreshToken = async ({
    userId,
    refreshToken,
    refreshTokenExpiresAt,
    clientInfo,
    jti,
}) => {

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await RefreshToken.create({
        user: userId,
        refreshToken: hashedRefreshToken,
        refreshTokenExpiresAt,
        clientInfo,
        jti,
    })
}


export const verifyRefreshToken = async (refreshToken) => {

    if(! refreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const session = await RefreshToken.findOne({
        user: decoded._id,
        jti: decoded.jti,
    }).select("+refreshToken");

    if(!session) {
        throw new ApiError(401, "Session not found.")
    }

    const isMatched = await bcrypt.compare(refreshToken, session.refreshToken);
    if(!isMatched) {
        throw new ApiError(401, "Invalid Refresh Token.")
    }

    if(session.refreshTokenExpiresAt < new Date()) {
        await RefreshToken.findByIdAndDelete( session._id );
        throw new ApiError(401, "Refresh Token expired.")
    }

    return session;
}

export const verifyAccessToken = async (accessToken) => {
    if(!accessToken) {
        throw new ApiError(401, "Access token is required")
    }

    const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET
    );

    return decoded;
}


export const generatePasswordResetToken  = () => {
    const tokenId = crypto.randomBytes(16).toString("hex");
    const resetToken = crypto.randomBytes(32).toString("hex");

    return { tokenId, resetToken }
}

export const hashToken = (token) => {
    return bcrypt.hash(token, 10);
};

export const compareToken = (token, hashedToken) => {
    return bcrypt.compare(token, hashedToken);
}