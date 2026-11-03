ALTER TABLE "skills" ADD COLUMN "level" integer DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "attribute";