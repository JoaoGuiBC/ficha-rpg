import { eq } from 'drizzle-orm'

import { newSkillSchema } from '~~/shared/schemas/add-skill'
import { type Result, err, ok } from '~~/shared/types/result'
import type { SkillType } from '~~/shared/types/skill-type'

import { character, skill } from '../../../db/schema'

export default defineEventHandler(async (event): Promise<Result<SkillType[]>> => {
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
    const parsed = newSkillSchema.array().min(1, 'Adicione ao menos uma perícia').safeParse(body)

    if (!parsed.success) {
        const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')

        console.log('[skills.post] validação falhou:', message)

        return err(message)
    }

    const createdSkills = await useDb()
        .insert(skill)
        .values(
            parsed.data.map(newSkill => ({
                id: newSkill.id,
                characterId: foundCharacter.id,
                name: newSkill.name.toLowerCase(),
                level: newSkill.level,
            })),
        )
        .onConflictDoNothing()
        .returning()

    console.log('[skill.post] perícias criadas:', createdSkills)

    return ok(createdSkills)
})
