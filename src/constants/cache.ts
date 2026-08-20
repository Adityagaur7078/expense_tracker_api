export const CACHE_TTL_SECONDS = 60;
export const EXPENSE_LIST_CACHE_KEY = "expenses:all";
export const expenseCacheKey = (id: string): string => `expense:${id}`;
