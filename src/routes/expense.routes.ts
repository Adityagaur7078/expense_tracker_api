import { Router } from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getExpenseByIdController,
  getExpenses,
  updateExpenseController
} from "../controllers/expense.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { createExpenseSchema, expenseIdParamsSchema, updateExpenseSchema } from "../validators/expense.validator.js";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(getExpenses));
router.get("/:id", validateParams(expenseIdParamsSchema), asyncHandler(getExpenseByIdController));
router.post("/", validateBody(createExpenseSchema), asyncHandler(createExpenseController));
router.patch("/:id", validateParams(expenseIdParamsSchema), validateBody(updateExpenseSchema), asyncHandler(updateExpenseController));
router.delete("/:id", validateParams(expenseIdParamsSchema), asyncHandler(deleteExpenseController));

export default router;
