import type { Request, Response } from "express";
import { expense1, expense2 } from "../utils/expense.js";
import type { ApiResponse } from "../types/api.types.js";
import type { CreateExpense, Expense } from "../types/expense.types.js";

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

export const createExpense = (req: Request<{}, {}, CreateExpense>, res: Response) => {
  const { title, amount, category, description } = req.body;

  if (!title?.trim() || amount === undefined || !category) {
    return res.status(400).json({
      success: false,
      data: null,
    });
  }

  const newExpense: Expense = {
    id: String(Date.now()),
    title,
    amount,
    category,
    description,
  };

  return res.status(201).json({
    success: true,
    data: newExpense,
  });
};