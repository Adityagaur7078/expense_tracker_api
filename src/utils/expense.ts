import type { Expense } from "../types/expense.types.js";
import type { ApiResponse } from "../types/api.types.js";

const expense1: Expense = {
    id: "1",
    title: "Lunch",
    amount: 200,
    category: "Food",
    description: "Food Healthy lots of meal"
};

const expense2: Expense = {
    id: "2",
    title: "Earrings",
    amount: 200,
    category: "Shopping"
};

const response: ApiResponse<string> = {
    success: true,
    data: "Expense created successfully",
};

const expenseResponse: ApiResponse<Expense> = {
    success: true,
    data: expense1,
}

export {
    expense1,
    expense2
};