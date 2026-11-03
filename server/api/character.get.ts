import type { CharacterList } from '~~/shared/types/character-list'
import { type Result, ok } from '~~/shared/types/result'

import { character } from '../db/schema'

export default defineEventHandler(async (): Promise<Result<CharacterList[]>> => {
    const characters = await useDb()
        .select({
            id: character.id,
            name: character.name,
            description: character.description,
            origin: character.origin,
            tint: character.tint,

            vitality: character.vitality,
            intelligence: character.intelligence,
            spirit: character.spirit,
            agility: character.agility,

            pvTrainings: character.pvTrainings,
            pmTrainings: character.pmTrainings,
            defenseTrainings: character.defenseTrainings,
        })
        .from(character)
        .orderBy(character.name)

    const charactersList = characters.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        origin: c.origin,
        tint: c.tint,

        pv: c.vitality * 5 + 10 + c.pvTrainings * 5,
        pm: (c.intelligence + c.spirit) * 3 + c.pmTrainings * 3,
        def: c.agility + 10 + c.defenseTrainings * 5,
    }))

    return ok(charactersList)
})

/*
VIG × 5 + 10 · +5 por treino
(INT + ESP) × 3 · +3 por treino
AGI + 10 · +5 por treino
*/
