import { createId } from '@paralleldrive/cuid2'
import { defineRelations } from 'drizzle-orm'
import { integer, pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

import { character } from './character'

export const skill = pgTable(
    'skills',
    {
        id: text()
            .primaryKey()
            .$defaultFn(() => createId()),
        characterId: text('character_id')
            .references(() => character.id, { onDelete: 'cascade' })
            .notNull(),

        name: varchar({ length: 255 }).notNull(),
        level: integer().notNull().default(5),
    },
    table => [uniqueIndex('skills_character_id_name_unique').on(table.characterId, table.name)],
)

export const relations = defineRelations({ skill, character }, row => ({
    skill: {
        character: row.one.character({
            from: row.skill.characterId,
            to: row.character.id,
        }),
    },
}))
