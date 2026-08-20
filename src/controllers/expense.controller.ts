import type { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http.js";
import { AppError } from "../errors/app.error.js";
import { createExpense, deleteExpense, getExpenseById, listExpenses, updateExpense } from "../services/expense.service.js";

export async function getExpenses(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const page = Math.max(1, Number(req.query.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 20)));

  if (!Number.isInteger(page) || !Number.isInteger(limit)) {
    throw new AppError("page and limit must be integers", 400);
  }

  const result = await listExpenses(req.user.id, page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: result,
  });
}

export async function getExpenseByIdController(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const expenseId = req.params.id;

  if (typeof expenseId !== "string") {
    throw new AppError("Invalid expense id", 400);
  }

  const expense = await getExpenseById(
    req.user.id,
    expenseId
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: expense,
  });
}

export async function createExpenseController(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const expense = await createExpense(
    req.user.id,
    req.body
  );

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: expense,
  });
}

export async function updateExpenseController(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const expenseId = req.params.id;

  if (typeof expenseId !== "string") {
    throw new AppError("Invalid expense id", 400);
  }

  const expense = await updateExpense(
    req.user.id,
    expenseId,
    req.body
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: expense,
  });
}

export async function deleteExpenseController(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const expenseId = req.params.id;

  if (typeof expenseId !== "string") {
    throw new AppError("Invalid expense id", 400);
  }

  await deleteExpense(
    req.user.id,
    expenseId
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: null,
  });
}