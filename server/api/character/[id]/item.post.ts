import { eq } from 'drizzle-orm'

import { newItemSchema } from '~~/shared/schemas/add-item'
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

    const body = await readBody(event)
    const parsed = newItemSchema.array().min(1, 'Adicione ao menos um item').safeParse(body)

    if (!parsed.success) {
        const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')

        console.log('[items.post] validação falhou:', message)

        return err(message)
    }

    const newItems = await useDb()
        .insert(item)
        .values(
            parsed.data.map(newItem => ({
                id: newItem.id,
                characterId: foundCharacter.id,
                name: newItem.name.toLowerCase(),
                description: newItem.description,
                type: newItem.type,
                rarity: newItem.rarity,
            })),
        )
        .onConflictDoNothing()
        .returning()

    const createdItems: ItemType[] = newItems.map(({ rarity, ...newItem }) => ({
        ...newItem,
        type: newItem.type as ItemCategory,
        ...(rarity ? { rarity: rarity as ItemRarity } : {}),
    }))

    console.log('[item.post] itens criados:', createdItems)

    return ok(createdItems)
})
