import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, sum } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import {
  expenses as expenseTable,
  insertExpenseSchema,
} from "../db/schema/expenses";
import { getUser } from "../kinde";
import { createExpenseRequestSchema } from "../sharedTypes";

export const expenseRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .orderBy(desc(expenseTable.createdAt))
      .limit(1000);

    return c.json({ expenses: expenses });
  })
  .post(
    "/",
    getUser,
    zValidator("json", createExpenseRequestSchema),
    async (c) => {
      const expense = c.req.valid("json");
      const user = c.var.user;

      const validatedExpense = insertExpenseSchema.parse({
        ...expense,
        userId: user.id,
      });

      const result = await db
        .insert(expenseTable)
        .values(validatedExpense)
        .returning()
        .then((res) => res[0]);

      c.status(201);
      return c.json(result);
    },
  )
  .get("total-spent", getUser, async (c) => {
    const user = c.var.user;

    const result = await db
      .select({ totalSpent: sum(expenseTable.amount) })
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);
    console.log("result: ", result);

    return c.json(result);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;

    const expense = await db
      .select()
      .from(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  // .put
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;

    const expense = await db
      .delete(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      c.notFound();
    } else {
      return c.json({ expense });
    }
  });

export default expenseRoute;
