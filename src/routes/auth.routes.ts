import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateBody(registerSchema), asyncHandler(registerUser));
router.post("/login", validateBody(loginSchema), asyncHandler(loginUser));

export default router;
