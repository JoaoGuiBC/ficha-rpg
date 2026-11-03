import { eq } from 'drizzle-orm'

import { character } from '~~/server/db/schema'
import type { Deletion } from '~~/shared/types/deletion'
import { type Result, err, ok } from '~~/shared/types/result'

export default defineEventHandler(async (event): Promise<Result<Deletion>> => {
    const id = getCharacterId(event)

    if (!id) {
        return err('ID do personagem inválido')
    }

    const [deleted] = await useDb()
        .delete(character)
        .where(eq(character.id, id))
        .returning({ name: character.name })

    if (!deleted) {
        return err('Personagem não encontrado')
    }

    return ok({ type: 'character', message: `${capitalizeAllWords(deleted.name)} saiu da lista` })
})
