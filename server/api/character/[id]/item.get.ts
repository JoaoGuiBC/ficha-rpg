import { eq } from 'drizzle-orm'

import type { ItemCategory } from '~~/shared/types/item-category'
import type { ItemRarity } from '~~/shared/types/item-rarity'
import type { ItemType } from '~~/shared/types/item-type'
import { type Result, err, ok } from '~~/shared/types/result'

import { character, item } from '../../../db/schema'

export default defineEventHandler(async (event): Promise<Result<ItemType[]>> => {
    const characterId = getCharacterId(event)

    if (!characterId) {
        return err('ID do personagem inválido')
    }

    const [foundCharacter] = await useDb()
        .select({ id: character.id })
        .from(character)
        .where(eq(character.id, characterId))
        .limit(1)

    if (!foundCharacter) {
        return err('Personagem não encontrado')
    }

    const items = await useDb()
        .select()
        .from(item)
        .where(eq(item.characterId, characterId))
        .orderBy(item.name)

    return ok(
        items.map(({ rarity, ...currentItem }) => ({
            ...currentItem,
            type: currentItem.type as ItemCategory,
            ...(rarity ? { rarity: rarity as ItemRarity } : {}),
        })),
    )
})
