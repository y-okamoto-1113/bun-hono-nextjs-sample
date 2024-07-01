import { insertExpenseSchema } from "./db/schema/expenses";

export const expenseScehema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const createExpenseSchema = expenseScehema.omit({ id: true });
