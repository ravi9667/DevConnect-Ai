import { Router } from "express";
import {
    signup,
    login,
    verifyEmail,
    resendVerification,
    verifyLoginOtp,
    forgetPassword,
    resetPassword,
    refreshAccessToken,
    googleLogin,
    googleCallback,
    githubLogin,
    githubCallback,
    logout,
    logoutAllDevices,
    getCurrentUser,
    updateAccount,
    deleteAccount,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js";
import { 
    signupSchema,
    resendVerificationSchema,
    loginOtpSchema,
    verifyLoginOtpSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
    updateAccountSchema,
} from "../validators/auth.validators.js";



const router = Router();

router.post("/signup", 
    validate(signupSchema), signup
);

router.get("/verify-email", verifyEmail);

router.post("/resend-verification",
    validate(resendVerificationSchema), resendVerification
);

router.post("/login",
    validate(loginOtpSchema), login
);

router.post("/verify-login-otp", 
    validate(verifyLoginOtpSchema), verifyLoginOtp
);

router.post("/refresh-token", refreshAccessToken);

router.post("/forget-password",
    validate(forgetPasswordSchema), forgetPassword
);
router.post("/reset-password",
    validate(resetPasswordSchema), resetPassword
);

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

router.get("/github", githubLogin);
router.get("/githubCallback", githubCallback);

router.get("/logout", authMiddleware, logout);
router.post("/logout-all", authMiddleware, logoutAllDevices);

router.get("/current-user", authMiddleware, getCurrentUser);

router.patch("/update-account",
    validate(updateAccountSchema), authMiddleware, updateAccount
);

router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;