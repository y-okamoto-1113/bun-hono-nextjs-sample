import { z } from "zod";

export const expenseScehema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(1, { message: "1文字以上入力してください。" })
    .max(100, { message: "100文字以内に収めてください。" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "正の数値を入力してください。小数点以下は2桁までです。",
  }),
});

export const createExpenseSchema = expenseScehema.omit({ id: true });
