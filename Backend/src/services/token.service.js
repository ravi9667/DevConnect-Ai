import { refreshToken } from "../models/refreshToken.model.js";

export const saveRefreshToken = async ({
    userId,
    refreshToken,
    refreshTokenExpiresAt,
    clientInfo,
}) => {

    await Token.create({
        user: userId,
        refreshToken,
        refreshTokenExpiresAt,
        clientInfo,
    })
}