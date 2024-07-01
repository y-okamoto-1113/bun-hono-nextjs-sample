ALTER TABLE "expenses" RENAME COLUMN "use_id" TO "user_id";--> statement-breakpoint
DROP INDEX IF EXISTS "user_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "expenses" USING btree ("user_id");