import { eq } from 'drizzle-orm'

import type { SkillType } from '~~/shared/types/skill-type'
import { type Result, err, ok } from '~~/shared/types/result'

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

    const skills = await useDb()
        .select({
            id: skill.id,
            characterId: skill.characterId,
            name: skill.name,
            level: skill.level,
        })
        .from(skill)
        .where(eq(skill.characterId, characterId))
        .orderBy(skill.name)

    return ok(skills)
})
