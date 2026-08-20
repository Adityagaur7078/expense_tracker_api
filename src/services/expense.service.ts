import { CACHE_TTL_SECONDS } from "../constants/cache.js";
import { AppError } from "../errors/app.error.js";
import {
  getCachedExpense,
  getCachedExpenses,
  invalidateExpenseCache,
  setCachedExpense,
  setCachedExpenses
} from "../repositories/expense.cache.repository.js";
import {
  createExpense as createExpenseRecord,
  deleteExpense as deleteExpenseRecord,
  findAllExpenses,
  findExpenseById,
  updateExpense as updateExpenseRecord
} from "../repositories/expense.repository.js";
import type { CreateExpense, Expense, UpdateExpense } from "../types/expense.types.js";
import { mapExpense } from "../utils/expense.mapper.js";

export async function listExpenses(userId: string, page = 1, limit = 20): Promise<{
  items: Expense[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}> {
  if (page === 1 && limit === 20) {
    try {
      const cached = await getCachedExpenses();
      if (cached) {
        return { items: cached, page, limit, total: cached.length, totalPages: 1 };
      }
    } catch (error) {
      console.error("Redis read failed:", error);
    }
  }

  const { documents, total } = await findAllExpenses(userId, page, limit);
  const items = documents.map(mapExpense);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (page === 1 && limit === 20) {
    try {
      await setCachedExpenses(items, CACHE_TTL_SECONDS);
    } catch (error) {
      console.error("Redis write failed:", error);
    }
  }

  return { items, page, limit, total, totalPages };
}

export async function getExpenseById(userId: string, id: string): Promise<Expense> {
  try {
    const cached = await getCachedExpense(id);
    if (cached && cached.userId === userId) return cached;
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  const document = await findExpenseById(userId, id);

  if (!document) {
    throw new AppError("Expense not found", 404);
  }

  const expense = mapExpense(document);

  try {
    await setCachedExpense(expense, CACHE_TTL_SECONDS);
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return expense;
}

export async function createExpense(userId: string, data: CreateExpense): Promise<Expense> {
  const document = await createExpenseRecord({ userId, ...data });
  const expense = mapExpense(document);

  try {
    await invalidateExpenseCache();
  } catch (error) {
    console.error("Redis invalidation failed:", error);
  }

  return expense;
}

export async function updateExpense(userId: string, id: string, data: UpdateExpense): Promise<Expense> {
  if (Object.keys(data).length === 0) {
    throw new AppError("At least one field is required for update", 400);
  }

  const document = await updateExpenseRecord(userId, id, data);

  if (!document) {
    throw new AppError("Expense not found", 404);
  }

  const expense = mapExpense(document);

  try {
    await invalidateExpenseCache(id);
    await setCachedExpense(expense, CACHE_TTL_SECONDS);
  } catch (error) {
    console.error("Redis invalidation failed:", error);
  }

  return expense;
}

export async function deleteExpense(userId: string, id: string): Promise<void> {
  const document = await deleteExpenseRecord(userId, id);

  if (!document) {
    throw new AppError("Expense not found", 404);
  }

  try {
    await invalidateExpenseCache(id);
  } catch (error) {
    console.error("Redis invalidation failed:", error);
  }
}
