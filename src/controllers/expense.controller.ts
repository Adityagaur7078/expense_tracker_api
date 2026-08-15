import type { Request, Response } from "express";
import { expense1, expense2 } from "../utils/expense.js";
import type { ApiResponse } from "../types/api.types.js";
import type { Expense } from "../types/expense.types.js";

export const getExpenses = (
  req: Request,
  res: Response<ApiResponse<Expense[]>>
) => {
  const expenses: Expense[] = [expense1, expense2];

  return res.status(200).json({
    success: true,
    data: expenses,
  });
};