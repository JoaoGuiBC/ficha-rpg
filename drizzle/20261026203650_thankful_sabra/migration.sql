CREATE TABLE "items" (
	"id" text PRIMARY KEY,
	"character_id" text,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"type" varchar(32) NOT NULL,
	"rarity" varchar(32) DEFAULT 'common' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" text PRIMARY KEY,
	"character_id" text,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"attribute" varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"id" text PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"tint" varchar(32) NOT NULL,
	"origin" varchar(64) NOT NULL,
	"origin_effect" varchar(255) NOT NULL,
	"current_pv" integer DEFAULT 0 NOT NULL,
	"current_pm" integer DEFAULT 0 NOT NULL,
	"used_impetus" integer DEFAULT 0 NOT NULL,
	"pv_trainings" integer DEFAULT 0 NOT NULL,
	"pm_trainings" integer DEFAULT 0 NOT NULL,
	"impetus_trainings" integer DEFAULT 0 NOT NULL,
	"defense_trainings" integer DEFAULT 0 NOT NULL,
	"strength" integer DEFAULT 1 NOT NULL,
	"agility" integer DEFAULT 1 NOT NULL,
	"vitality" integer DEFAULT 1 NOT NULL,
	"intelligence" integer DEFAULT 1 NOT NULL,
	"spirit" integer DEFAULT 1 NOT NULL,
	"notes_1" text DEFAULT '' NOT NULL,
	"notes_2" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "characters_name_unique" ON "characters" (lower("name"));--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_character_id_characters_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_character_id_characters_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE;