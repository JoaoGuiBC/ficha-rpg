// server/api/character/[id].get.ts
import { eq } from 'drizzle-orm'

import { character, item, skill } from '~~/server/db/schema'
import type { CharacterSheet } from '~~/shared/types/character-sheet'
import type { ItemCategory } from '~~/shared/types/item-category'
import type { ItemRarity } from '~~/shared/types/item-rarity'
import { type Result, err, ok } from '~~/shared/types/result'

export default defineEventHandler(async (event): Promise<Result<CharacterSheet>> => {
    const id = getCharacterId(event)

    if (!id) {
        return err('ID do personagem inválido')
    }

    const db = useDb()

    const [characters, skills, items] = await db.batch([
        db.select().from(character).where(eq(character.id, id)).limit(1),
        db.select().from(skill).where(eq(skill.characterId, id)).orderBy(skill.name),
        db.select().from(item).where(eq(item.characterId, id)).orderBy(item.name),
    ])

    const [foundCharacter] = characters

    if (!foundCharacter) {
        return err('Personagem não encontrado')
    }

    return ok({
        character: foundCharacter,
        skills,
        items: items.map(({ rarity, ...currentItem }) => ({
            ...currentItem,
            type: currentItem.type as ItemCategory,
            ...(rarity ? { rarity: rarity as ItemRarity } : {}),
        })),
    })
})
