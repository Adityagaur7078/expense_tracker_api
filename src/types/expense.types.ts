export type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Health"
  | "Other";

export type Expense = {
  readonly id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateExpense = Omit<
  Expense,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
export type UpdateExpense = Partial<Omit<Expense, "id" | "userId" | "createdAt" | "updatedAt">>;
