import type { CharacterType } from '~~/shared/types/character-type'
import { newCharacterSchema } from '~~/shared/schemas/add-character'
import { type Result, err, ok } from '~~/shared/types/result'

import { character } from '../db/schema'

export default defineEventHandler(async (event): Promise<Result<CharacterType>> => {
    const body = await readBody(event)
    const parsed = newCharacterSchema.safeParse(body)

    if (!parsed.success) {
        const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')

        console.log('[characters.post] validação falhou:', message)

        return err(message)
    }

    const { data } = parsed

    /*
    VIG × 5 + 10 · +5 por treino
    (INT + ESP) × 3 · +3 por treino
    AGI + 10 · +5 por treino
    */

    const newCharacter = await useDb()
        .insert(character)
        .values({
            name: data.name.toLowerCase(),
            description: data.description,
            tint: data.tint,
            origin: data.origin,
            currentPV: 1 * 5 + 10,
            currentPM: (1 + 1) * 3,
        })
        .onConflictDoNothing()
        .returning()

    if (!newCharacter[0]) {
        console.log('[characters.post] personagem já existe:', data.name)

        return err(`Já existe um personagem com nome ${data.name}`)
    }

    console.log('[characters.post] cliente criado:', newCharacter[0])

    return ok(newCharacter[0])
})
