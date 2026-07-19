import crypto from 'crypto';
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendVerificationEmail } from '../services/email.service.js';
import verifyEmailTemplate from '../templates/verifyEmail.templates.js';


export const signup =  asyncHandler(async (req, res) => {

    const { fullName, username, email, password } = req.body;

    const existingEmail = await User.findOne({email});
    if(existingEmail) {
        throw new ApiError(409, "Email already registered");
    }

    const existingUsername = await User.findOne({username});
    if(existingUsername) {
        throw new ApiError(409, "Username already taken");
    }

    const emailVerificationToken = crypto
        .randomBytes(32)
        .toString("hex");

    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newUser = new User({
        fullName,
        username,
        email,
        password,
        emailVerificationToken,
        emailVerificationExpires,
    });
    await newUser.save();

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${emailVerificationToken}&email=${email}`;
    const html = verifyEmailTemplate({fullName, verificationLink});
    await sendVerificationEmail({
        to: email,
        subject: "Verify Your Email",
        html,
    })

    return res.status(201).json(
        new ApiResponse(201, "Account Created Successfully. please verify your email", null)
    );

});