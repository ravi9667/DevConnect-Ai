import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../services/token.service.js";

export const authMiddleware = asyncHandler( async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if(!accessToken) {
        throw new ApiError(
            401,
            "Unauthorized. Access token is missing."
        )
    }

    const decoded = await verifyAccessToken(accessToken)

    const user = await User.findById(decoded._id);
    if(!user) {
        throw new ApiError(401, "user not found")
    }

    req.user = user;

    next()
})