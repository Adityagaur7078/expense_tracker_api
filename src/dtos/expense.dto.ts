import type { ExpenseCategory } from "../types/expense.types.js";

export type CreateExpenseDto = {
  title: string;
  amount: number;
  category: ExpenseCategory;
  description?: string;
};

export type UpdateExpenseDto = Partial<CreateExpenseDto>;
