import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(1),
  amount: z.number().positive(),
  category: z.enum([
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ]),
  description: z.string().optional(),
});