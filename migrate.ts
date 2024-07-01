import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

console.log("マグレーション開始");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error(
    "環境変数DB_HOST, DB_USER, DB_PASSWORD, DB_NAMEが設定されていません。",
  );
}

const migrationClient = postgres({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: true,
  max: 1,
});
await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
await migrationClient.end(); // これしないとプロセスが閉じない。
console.log("マイグレーション終了");
