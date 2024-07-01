import {
  date,
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("tite").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("user_id_idx").on(expenses.userId),
    };
  },
);

// Schema for inserting a expense - can be used to validate API requests
export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z
    .string()
    .min(1, { message: "1文字以上入力してください。" })
    .max(100, { message: "100文字以内に収めてください。" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "正の数値を入力してください。小数点以下は2桁までです。",
  }),
});
// Schema for selecting a expense - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expenses);
