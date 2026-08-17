import { Router } from "express";
import { getExpenses, createExpense } from "../controllers/expense.controller.js";
import { validate } from "../middleware/validate.js";
import { createExpenseSchema } from "../validators/expense.validator.js";

const router = Router();

router.get("/", getExpenses);
router.post(
  "/",
  validate(createExpenseSchema),
  createExpense
);

export default router;