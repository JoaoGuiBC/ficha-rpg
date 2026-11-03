import { and, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'

import type { Deletion } from '~~/shared/types/deletion'
import { type Result, err, ok } from '~~/shared/types/result'

import { character, item } from '../../../db/schema'

const deleteItemsSchema = z
    .array(z.string('Nome do item inválido').trim().min(1, 'Nome do item inválido'))
    .min(1, 'Remova ao menos um item')

export default defineEventHandler(async (event): Promise<Result<Deletion>> => {
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
    const parsed = deleteItemsSchema.safeParse(body)

    if (!parsed.success) {
        const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')

        console.log('[items.delete] validação falhou:', message)

        return err(message)
    }

    const itemNames = [...new Set(parsed.data.map(name => name.toLowerCase()))]
    const deletedItems = await useDb()
        .delete(item)
        .where(and(eq(item.characterId, characterId), inArray(item.name, itemNames)))
        .returning({ name: item.name })

    if (deletedItems.length !== itemNames.length) {
        return err('Um ou mais itens não foram encontrados')
    }

    return ok({
        type: 'item',
        message: `${deletedItems.length} item(ns) removido(s)`,
    })
})
