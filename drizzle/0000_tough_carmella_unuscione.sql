CREATE TABLE IF NOT EXISTS "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"use_id" text NOT NULL,
	"tite" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "expenses" USING btree ("use_id");