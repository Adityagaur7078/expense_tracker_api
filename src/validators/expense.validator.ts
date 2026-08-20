import { z } from "zod";

export const expenseCategorySchema = z.enum([
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other"
]);

export const createExpenseSchema = z.object({
  title: z.string().trim().min(1).max(120),
  amount: z.number().finite().positive(),
  category: expenseCategorySchema,
  description: z.string().trim().max(1000).optional()
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const expenseIdParamsSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid expense id")
});
