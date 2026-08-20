import { redis } from "../config/redis.js";
import { EXPENSE_LIST_CACHE_KEY, expenseCacheKey } from "../constants/cache.js";
import type { Expense } from "../types/expense.types.js";

export async function getCachedExpenses(): Promise<Expense[] | null> {
  const value = await redis.get(EXPENSE_LIST_CACHE_KEY);
  return value ? JSON.parse(value) as Expense[] : null;
}

export async function setCachedExpenses(expenses: Expense[], ttl: number): Promise<void> {
  await redis.set(EXPENSE_LIST_CACHE_KEY, JSON.stringify(expenses), "EX", ttl);
}

export async function getCachedExpense(id: string): Promise<Expense | null> {
  const value = await redis.get(expenseCacheKey(id));
  return value ? JSON.parse(value) as Expense : null;
}

export async function setCachedExpense(expense: Expense, ttl: number): Promise<void> {
  await redis.set(expenseCacheKey(expense.id), JSON.stringify(expense), "EX", ttl);
}

export async function invalidateExpenseCache(id?: string): Promise<void> {
  const keys = [EXPENSE_LIST_CACHE_KEY];
  if (id) keys.push(expenseCacheKey(id));
  await redis.del(...keys);
}
