import type { Request, Response } from "express";
import type { ApiResponse } from "../types/api.types.js";
import type { CreateExpense, Expense } from "../types/expense.types.js";
import { createExpense as createExpenseService } from "../services/expense.service.js";
import { getExpenses as getExpensesService } from "../services/expense.service.js";

export const getExpenses = (
  req: Request,
  res: Response<ApiResponse<Expense[]>>
) => {
  const expenses = getExpensesService();

  return res.status(200).json({
    success: true,
    data: expenses,
  });
};

export const createExpense = (req: Request<{}, {}, CreateExpense>, res: Response) => {
  const newExpense = createExpenseService(req.body);

  return res.status(201).json({
    success: true,
    data: newExpense,
  });
};