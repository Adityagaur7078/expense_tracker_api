import type { CreateExpense, Expense } from "../types/expense.types.js";
import { findAllExpenses } from "../repositories/expense.repository.js";
import { saveExpense } from "../repositories/expense.repository.js";

export const createExpense = (data: CreateExpense): Expense => {
  const newExpense: Expense = {
    id: String(Date.now()),
    ...data,
  };

  return saveExpense(newExpense);
};

export const getExpenses = (): Expense[] => {
  return findAllExpenses();
};