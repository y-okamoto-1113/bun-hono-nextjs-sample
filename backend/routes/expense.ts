import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expenseScehema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseScehema>;
const fakeExpenses: Array<Expense> = [
  { id: 1, title: "食費", amount: 1000 },
  { id: 2, title: "交通費", amount: 2000 },
  { id: 3, title: "住宅費", amount: 3000 },
];

const createExpenseSchema = expenseScehema.omit({ id: true });

export const expenseRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const data = await c.req.json();
    const expense = createExpenseSchema.parse(data);
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json({ expense });
  })
  .get("total-spent", async (c) => {
    const totalSpent = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );
    return c.json({ totalSpent });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      c.notFound();
    } else {
      return c.json({ expense });
    }
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      c.notFound();
    } else {
      const deletedExpense = fakeExpenses.splice(index, 1)[0];
      return c.json({ expense: deletedExpense });
    }
  });
// .put

export default expenseRoute;
