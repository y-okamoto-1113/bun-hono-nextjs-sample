import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const { ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!ENV || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error(
    "環境変数ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAMEが設定されていません。",
  );
}

// import defineConfig from "../../drizzle.config.ts";

const sslOption =
  ENV === "development" ? { rejectUnauthorized: false, noVerify: true } : true;
const queryClient = postgres({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: sslOption,
});
export const db = drizzle(queryClient);
