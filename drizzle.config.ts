import { defineConfig } from "drizzle-kit";

const { ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!ENV || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error(
    "環境変数ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAMEが設定されていません。",
  );
}

const sslOption =
  ENV === "development" ? { rejectUnauthorized: false, noVerify: true } : true;
export default defineConfig({
  schema: "./backend/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: sslOption,
  },
});
