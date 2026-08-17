import type { Expense } from "../types/expense.types.js";
import { expense1, expense2 } from "../utils/expense.js";

export const findAllExpenses = (): Expense[] => {
    return [expense1, expense2];
};

export const saveExpense = (expense: Expense): Expense => {
    return expense;
};