import { createId } from '@paralleldrive/cuid2'
import { defineRelations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'

import { character } from './character'

export const item = pgTable('items', {
    id: text()
        .primaryKey()
        .$defaultFn(() => createId()),
    characterId: text('character_id')
        .notNull()
        .references(() => character.id, { onDelete: 'cascade' }),

    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    type: varchar({ length: 32 }).notNull(),
    rarity: varchar({ length: 32 }),
})

export const relations = defineRelations({ item, character }, row => ({
    item: {
        character: row.one.character({
            from: row.item.characterId,
            to: row.character.id,
        }),
    },
}))
