import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import { integer, pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const character = pgTable(
    'characters',
    {
        id: text()
            .primaryKey()
            .$defaultFn(() => createId()),

        name: varchar({ length: 255 }).unique().notNull(),
        description: varchar({ length: 255 }).notNull(),
        origin: varchar({ length: 64 }).notNull(),
        tint: varchar({ length: 32 }).notNull(),

        currentPV: integer('current_pv').notNull().default(0),
        currentPM: integer('current_pm').notNull().default(0),
        usedImpetus: integer('used_impetus').notNull().default(0),

        pvTrainings: integer('pv_trainings').notNull().default(0),
        pmTrainings: integer('pm_trainings').notNull().default(0),
        impetusTrainings: integer('impetus_trainings').notNull().default(0),
        defenseTrainings: integer('defense_trainings').notNull().default(0),

        strength: integer('strength').notNull().default(1),
        agility: integer('agility').notNull().default(1),
        vitality: integer('vitality').notNull().default(1),
        intelligence: integer('intelligence').notNull().default(1),
        spirit: integer('spirit').notNull().default(1),

        notes1: text('notes_1').notNull().default(''),
        notes2: text('notes_2').notNull().default(''),
    },
    table => [uniqueIndex('characters_name_unique').on(sql`lower(${table.name})`)],
)
