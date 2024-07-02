import type { z } from "zod";
import { insertExpenseSchema } from "./db/schema/expenses";

export const createExpenseSchema = insertExpenseSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
