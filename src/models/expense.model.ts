import { Schema, model, type InferSchemaType } from "mongoose";

const expenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      enum: ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Health", "Other"],
      required: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

expenseSchema.index({ userId: 1, createdAt: -1 });

export type ExpenseDocument = InferSchemaType<typeof expenseSchema>;
export const ExpenseModel = model("Expense", expenseSchema);
