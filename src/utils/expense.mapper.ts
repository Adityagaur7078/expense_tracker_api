import type { ExpenseDocument } from "../models/expense.model.js";
import type { Expense } from "../types/expense.types.js";

export function mapExpense(
  document: ExpenseDocument & {
    _id: unknown;
    createdAt: Date;
    updatedAt: Date;
  }
): Expense {
  return {
    id: String(document._id),
    userId: String(document.userId),
    title: document.title,
    amount: document.amount,
    category: document.category as Expense["category"],
    ...(document.description != null
      ? { description: document.description }
      : {}),
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
}