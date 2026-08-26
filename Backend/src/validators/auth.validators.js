import { z } from "zod";

export const signupSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3,'full Name must be at least 3 characters')
        .max(50, "full Name cannot exceed 50 characters"),

    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(3,'username must be at least 3 characters')
        .max(50, "username cannot exceed 30 characters")
        .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers and underscore"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("invalid email address"),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, "Password cannot exceed 100 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain uppercase, lowercase, number and special character"),
});

export const resendVerificationSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address"),
});

export const loginOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid Email"),

    password: z
        .string()
        .min(8, "Password must contain minimum 8 characters"),
})

export const verifyLoginOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),

    otp: z
        .string()
        .length(6, "OTP must be 6 digits"),
});

export const forgetPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),
});

export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1),

    password: z
        .string()
        .min(8),
});


export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1),

    newPassword: z
        .string()
        .min(8),
});

export const updateAccountSchema = z.object({
    fullName: z
        .string()
        .min(3)
        .max(50)
        .trim()
        .optional(),

    username: z
        .string()
        .min(3)
        .max(30)
        .trim()
        .optional(),
})