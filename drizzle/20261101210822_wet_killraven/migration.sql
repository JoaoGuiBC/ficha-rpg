ALTER TABLE "items" ALTER COLUMN "rarity" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "rarity" DROP NOT NULL;