import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));

                return next(
                    new ApiError(
                        400,
                        "Validation failed",
                        errors
                    )
                );
            }

            next(error);
        }
    };
};

export default validate;