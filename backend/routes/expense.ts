import { Hono } from "hono";
import { z } from "zod";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Array<Expense> = [
  { id: 1, title: "食費", amount: 1000 },
  { id: 2, title: "交通費", amount: 2000 },
  { id: 3, title: "住宅費", amount: 3000 },
];

const ccreateExpenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export const expenseRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const expense = ccreateExpenseSchema.parse(data);
    return c.json({ expense });
  });
// .delete
// .put

export default expenseRoute;
