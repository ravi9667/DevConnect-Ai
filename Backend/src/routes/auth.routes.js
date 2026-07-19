import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { signupSchema } from "../validators/auth.validators.js";

const router = Router();

router.post("/signup", 
    validate(signupSchema), signup
);

export default router;