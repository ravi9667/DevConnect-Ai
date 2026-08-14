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
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { 
    signupSchema,
    resendVerificationSchema,
    loginOtpSchema,
    verifyLoginOtpSchema,
    forgetPasswordSchema,
    resetPasswordSchema
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
)

export default router;