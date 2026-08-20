import { ExpenseModel } from "../models/expense.model.js";

export async function findAllExpenses(userId: string, page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [documents, total] = await Promise.all([
    ExpenseModel.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
    ExpenseModel.countDocuments({ userId })
  ]);

  return { documents, total };
}

export async function findExpenseById(userId: string, id: string) {
  return ExpenseModel.findOne({ _id: id, userId }).exec();
}

export async function createExpense(data: {
  userId: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
}) {
  return ExpenseModel.create(data);
}

export async function updateExpense(
  userId: string,
  id: string,
  data: Record<string, unknown>
) {
  return ExpenseModel.findOneAndUpdate(
    { _id: id, userId },
    { $set: data },
    { new: true, runValidators: true }
  ).exec();
}

export async function deleteExpense(userId: string, id: string) {
  return ExpenseModel.findOneAndDelete({ _id: id, userId }).exec();
}
