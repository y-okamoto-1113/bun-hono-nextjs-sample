import type { Logger } from "drizzle-orm/logger";
import { drizzle } from "drizzle-orm/postgres-js";
import { bold, lightBlue, lightMagenta, red } from "kolorist";
import postgres from "postgres";

const { ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!ENV || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error(
    "環境変数ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAMEが設定されていません。",
  );
}

const sslOption =
  ENV === "development" ? { rejectUnauthorized: false, noVerify: true } : true;
const queryClient = postgres({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: sslOption,
});

class SqlLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    // カラー一覧は以下
    // @see https://github.com/marvinhagemeister/kolorist/blob/a8fabdc6c8fdb8e87d41239e68708dbde7539496/src/index.ts#L136
    console.log(lightBlue(bold(`Query: ${query}`)));
    console.log(lightMagenta(bold(`Parameters: ${JSON.stringify(params)}`)));
  }
}

export const db = drizzle(queryClient, { logger: new SqlLogger() });
