ALTER TABLE "expenses" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "updated_at" timestamp DEFAULT now();