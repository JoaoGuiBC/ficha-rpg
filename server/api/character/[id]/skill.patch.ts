import { and, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'

import { skillLevelSchema } from '~~/shared/schemas/add-skill'
import { type Result, err, ok } from '~~/shared/types/result'
import type { SkillType } from '~~/shared/types/skill-type'

import { character, skill } from '../../../db/schema'

const updateSkillsSchema = z
    .array(
        z.object({
            id: z.cuid2('ID da perícia inválido'),
            level: skillLevelSchema,
        }),
    )
    .min(1, 'Atualize ao menos uma perícia')

export default defineEventHandler(async (event): Promise<Result<SkillType[]>> => {
    const characterId = getCharacterId(event)

    if (!characterId) {
        return err('ID do personagem inválido')
    }

    const db = useDb()

    const [foundCharacter] = await db
        .select({ id: character.id })
        .from(character)
        .where(eq(character.id, characterId))
        .limit(1)

    if (!foundCharacter) {
        return err('Personagem não encontrado')
    }

    const body = await readBody(event)
    const parsed = updateSkillsSchema.safeParse(body)

    if (!parsed.success) {
        const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')

        console.log('[skills.patch] validação falhou:', message)

        return err(message)
    }

    const ids = parsed.data.map(updatedSkill => updatedSkill.id)

    if (new Set(ids).size !== ids.length) {
        return err('Não é possível atualizar a mesma perícia mais de uma vez')
    }

    const existingSkills = await db
        .select({ id: skill.id })
        .from(skill)
        .where(and(eq(skill.characterId, characterId), inArray(skill.id, ids)))

    if (existingSkills.length !== ids.length) {
        return err('Uma ou mais perícias não foram encontradas')
    }

    const queries = parsed.data.map(({ id, level }) =>
        db
            .update(skill)
            .set({ level })
            .where(and(eq(skill.id, id), eq(skill.characterId, characterId)))
            .returning(),
    )

    const results = await db.batch(
        queries as [(typeof queries)[number], ...(typeof queries)[number][]],
    )

    return ok(results.flat())
})
