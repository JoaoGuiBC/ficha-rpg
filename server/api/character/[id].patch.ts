import { eq } from 'drizzle-orm'
import { z } from 'zod'

import type { CharacterType } from '~~/shared/types/character-type'
import { type Result, err, ok } from '~~/shared/types/result'

import { character } from '../../db/schema'

const updateCharacterSchema = z
    .object({
        name: z.string('Nome inválido').trim().min(1, 'Nome inválido'),
        description: z.string('Descrição inválida'),
        tint: z.string('Cor inválida').trim().min(1, 'Cor inválida'),
        origin: z.string('Origem inválida').trim().min(1, 'Origem inválida'),
        currentPV: z.coerce.number('PV atual inválido').int().min(0),
        currentPM: z.coerce.number('PM atual inválido').int().min(0),
        usedImpetus: z.coerce.number('Ímpeto usado inválido').int().min(0),
        pvTrainings: z.coerce.number('Treinos de PV inválidos').int().min(0),
        pmTrainings: z.coerce.number('Treinos de PM inválidos').int().min(0),
        impetusTrainings: z.coerce.number('Treinos de ímpeto inválidos').int().min(0),
        defenseTrainings: z.coerce.number('Treinos de defesa inválidos').int().min(0),
        strength: z.coerce.number('Força inválida').int().min(0),
        agility: z.coerce.number('Agilidade inválida').int().min(0),
        vitality: z.coerce.number('Vitalidade inválida').int().min(0),
        intelligence: z.coerce.number('Inteligência inválida').int().min(0),
        spirit: z.coerce.number('Espírito inválido').int().min(0),
        notes1: z.string('Notas inválidas'),
        notes2: z.string('Notas inválidas'),
    })
    .partial()
    .refine(data => Object.keys(data).length > 0, 'Informe ao menos um campo')

export default defineEventHandler(async (event): Promise<Result<CharacterType>> => {
    const characterId = getCharacterId(event)

    if (!characterId) {
        return err('ID do personagem inválido')
    }

    const body = await readBody(event)
    const parsed = updateCharacterSchema.safeParse(body)

    if (!parsed.success) {
        const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')

        console.log('[character.patch] validação falhou:', message)

        return err(message)
    }

    const [updatedCharacter] = await useDb()
        .update(character)
        .set({
            ...parsed.data,
            ...(parsed.data.name ? { name: parsed.data.name.toLowerCase() } : {}),
        })
        .where(eq(character.id, characterId))
        .returning()

    if (!updatedCharacter) {
        return err('Personagem não encontrado')
    }

    return ok(updatedCharacter)
})
