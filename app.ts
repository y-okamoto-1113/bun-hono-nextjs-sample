import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { z } from "zod";

const app = new Hono();
app.get("/test", (c) => {
  return c.json({ message: "test bun json" });
});

app.use(async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}`);
});

// http://localhost:3000/hello?name=okamoto
const route = app.get(
  "/hello",
  zValidator(
    "query",
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello! ${name}`,
    });
  },
);
export type AppType = typeof route;

// http://localhost:3000/posts/1?page=5
const pathParamsSchema = z.object({
  id: z.preprocess(
    // パス・クエリパラメータは文字列で受け取るため、数値に変換する
    (val) => (val ? Number.parseInt(val as string, 10) : null),
    z.number().int().positive(),
  ),
});
const queryParamsSchema = z.object({
  page: z.preprocess(
    (val) => (val ? Number.parseInt(val as string, 10) : null),
    z.number().int().positive().nullable(),
  ),
});
app.get("/posts/:id", (c) => {
  const pathValidation = pathParamsSchema.safeParse(c.req.param());
  const queryValidation = queryParamsSchema.safeParse(c.req.query());
  if (!pathValidation.success) {
    return c.json({ success: false, error: pathValidation.error }, 400);
  }
  if (!queryValidation.success) {
    return c.json({ success: false, error: queryValidation.error }, 400);
  }
  const { id } = pathValidation.data;
  const { page } = queryValidation.data;

  c.header("X-Message", "Hi!");
  return c.text(`You want see ${page} of ${id}`);
});

// Basic認証
app.use(
  "/admin/*",
  basicAuth({
    username: "admin",
    password: "secret",
  }),
);
app.get("/admin", (c) => {
  return c.text("You are authorized!");
});

export default app;
