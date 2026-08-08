import { Router } from "express";
import { signup, login, verifyEmail, resendVerification, verifyLoginOtp } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { 
    signupSchema,
    resendVerificationSchema,
    loginOtpSchema,
    verifyLoginOtpSchema,
} from "../validators/auth.validators.js";

const router = Router();

router.post("/signup", 
    validate(signupSchema), signup
);

router.get("/verify-email", verifyEmail);

router.post("/resend-verification",
    validate(resendVerificationSchema), resendVerification
);

router.post(".login",
    validate(loginOtpSchema), login
)

router.post("/verify-login-otp", 
    validate(verifyLoginOtpSchema), verifyLoginOtp
)

export default router;