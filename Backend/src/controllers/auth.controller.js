import crypto from 'crypto';
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { VerificationToken } from '../models/verificationToken.model.js';
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendVerificationEmail } from '../services/email.service.js';
import verifyEmailTemplate from '../templates/verifyEmail.templates.js';
import { LoginOtp } from '../models/loginOtp.model.js';
import generateOTP from '../utils/generateOTP.js';
import loginOtpTemplate from '../templates/loginOtp.template.js';
import { accessCookieOptions, refreshCookieOptions } from '../utils/cookieOptions.js';
import validate from '../middlewares/validate.middleware.js';
import { saveRefreshToken } from '../services/token.service.js';
import { getRequestInfo } from '../utils/requestInfo.js';


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

    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const hasedEmailVerificationToken = await bcrypt.hash(emailVerificationToken, 10);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
        fullName,
        username,
        email,
        password,
    });
    await newUser.save();

    await VerificationToken.create({
        user: newUser._id,
        token: hasedEmailVerificationToken,
        type: "email-verification",
        expiresAt,
    })

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


export const verifyEmail = asyncHandler( async (req, res) => {

    const { token, email } = req.query;

    if((!token) || (!email)) {
        throw new ApiError(400, "Verification token is required");
    }

    const user = await User.findOne({ email })
    if(!user) {
        throw new ApiError(404, "User not Found");
    }

    const verificationToken = await VerificationToken.findOne({
        user: user._id,
        type: "email-verification",
    }).select("+token");
    if(!verificationToken) {
        throw new ApiError(400, "Verification Token not Found.")
    }

    if(user.isEmailVerified) {
        throw new ApiError(400, "Email already registered");
    }

    if(verificationToken.expiresAt < new Date()) {
        await VerificationToken.deleteOne({_id: verificationToken._id,})
        throw new ApiError(400, "Verification link is Expired.");
    }

    const isTokenValid = await bcrypt.compare(token, verificationToken.token)
    if(!isTokenValid) {
        throw new ApiError(400, "Invalid Verification link");
    }

    user.isEmailVerified = true;
    await user.save();

    await VerificationToken.deleteOne({ _id: verificationToken._id })

    return res.status(200).json(
        new ApiResponse(200, "Email Verified Successfully.")
    )
});


export const resendVerification = asyncHandler( async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    if(user.isEmailVerified) {
        throw new ApiError(400, "Email already verified")
    }

    await VerificationToken.deleteOne({
        user: user._id,
        type: "email-verification",
    })

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(verificationToken, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await VerificationToken.create({
        user: user._id,
        token: hashedToken,
        type: "email-verification",
        expiresAt,
    })

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${email}`;
    const html = verifyEmailTemplate({
        fullName: user.fullName,
        verificationLink,
    });

    await sendVerificationEmail({
        to: user.email,
        subject: "Verify Your Email",
        html,
    });

    return res.status(200).json(
        new ApiResponse(200, "Verification email sent successfully.")
    );
});


export const login = asyncHandler( async (req, res) => {

    const { email, password } = req.body;

    //find User
    const user = await User.findOne({ email }).select("+password");
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    // Email Verification check
    if(!user.isEmailVerified) {
        throw new ApiError(401, "Please verify your email first.")
    }

    // Account Active check
    if(!user.isActive) {
        throw new ApiError(403, "Your Account has been deactivated.");
    }

    // Password correction check
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password");
    }

    // Delete Previous OTP
    await LoginOtp.deleteMany({
        user: user._id,
    });

    // Generate OTP
    const otp = generateOTP();

    // Hash otp
    const hashedOtp = await bcrypt.hash(otp, 12);

    // Otp Expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // save otp
    await LoginOtp.create({
        user: user._id,
        otp: hashedOtp,
        expiresAt,
    });

    // Email Otp
    const html = loginOtpTemplate({
        fullName: user.fullName,
        otp,
    });

    // send otp
    await sendVerificationEmail({
        to: user.email,
        subject: "Login OTP",
        html,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            "OTP sent successfully.",
            null
        )
    );

});


export const verifyLoginOtp = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        throw new ApiError(404, "User Not Found")
    }

    const loginOtp = await LoginOtp.findOne({ user:user._id }).select("+otp");
    if(!loginOtp) {
        throw new ApiError(400, "OTP not found");
    }

    if(loginOtp.expiresAt < new Date()) {
        await LoginOtp.deleteOne({_id: loginOtp._id});
        throw new ApiError(400, "OTP has expired");
    }

    const isOtpCorrect = await bcrypt.compare(otp, loginOtp.otp);
    if(!isOtpCorrect) {
        loginOtp.attempts += 1;
        await loginOtp.save();
        throw new ApiError(400, "Invalid OTP");
    }

    if(loginOtp.attempts >= 5) {
        await LoginOtp.deleteOne({ _id: loginOtp._id });
        throw new ApiError(429, "Maximum OTP attempts exceeded. Please Login Again.")
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const requestInfo = getRequestInfo(req);
    
    await saveRefreshToken({
        userId: user._id,
        refreshToken: refreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        clientInfo: requestInfo,
    })

    await LoginOtp.deleteOne({ _id: loginOtp._id });

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .json(
            new ApiResponse(
                200,
                "Login Successfull",
                null,
            )
        )
    ;
});


