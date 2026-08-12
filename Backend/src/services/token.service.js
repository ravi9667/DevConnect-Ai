import { RefreshToken } from "../models/refreshToken.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApiError from "../utils/ApiError.js";


export const saveRefreshToken = async ({
    userId,
    refreshToken,
    refreshTokenExpiresAt,
    clientInfo,
}) => {

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await RefreshToken.create({
        user: userId,
        refreshToken: hashedRefreshToken,
        refreshTokenExpiresAt,
        clientInfo,
    })
}


export const verifyRefreshToken = async (refreshToken) => {

    if(! refreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const sessions = await RefreshToken.find({
        user: decoded._id,
    }).select("+refreshToken");

    if(! sessions.length) {
        throw new ApiError(401, "Session not found.")
    }

    let matchedSession = null;

    for(const session of sessions) {
        const isMatched = await bcrypt.compare(refreshToken, session.refreshToken);

        if(isMatched) {
            matchedSession = session;
            break;
        }
    }

    if(!matchedSession) {
        throw new ApiError(401, "Invalid Refresh Token.")
    }

    if(matchedSession.refreshTokenExpiresAt < new Date()) {
        await RefreshToken.findByIdAndDelete( matchedSession._id );
        throw new ApiError(401, "Refresh Token expired.")
    }

    return matchedSession;
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