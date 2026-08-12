export type CreateExpense = Omit<Expense, "id">;

type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Health"
  | "Other";

export type Expense = {
    title: string;
    amount: number;
    category: ExpenseCategory;
    description?: string;
    readonly id: string;
};
