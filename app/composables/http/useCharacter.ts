import type { NewCharacter, NewItem, NewSkill } from '~~/shared/schemas'
import type { CharacterSheet } from '~~/shared/types/character-sheet'
import type { CharacterType } from '~~/shared/types/character-type'
import type { Deletion } from '~~/shared/types/deletion'
import type { ItemType } from '~~/shared/types/item-type'
import type { Result } from '~~/shared/types/result'
import type { SkillType } from '~~/shared/types/skill-type'

type SkillUpdate = Pick<SkillType, 'id' | 'level'>
type CharacterUpdate = Partial<Omit<CharacterType, 'id'>>

export function useCharacter() {
    const post = async (data: NewCharacter): Promise<Result<CharacterType>> => {
        return await $fetch<Result<CharacterType>>('/api/character', {
            method: 'POST',
            body: data,
        })
    }

    const getSheet = async (characterId: string): Promise<Result<CharacterSheet>> => {
        return await $fetch<Result<CharacterSheet>>(`/api/character/${characterId}`)
    }

    const patch = async (
        characterId: string,
        data: CharacterUpdate,
    ): Promise<Result<CharacterType>> => {
        return await $fetch<Result<CharacterType>>(`/api/character/${characterId}`, {
            method: 'PATCH',
            body: data,
        })
    }

    const postSkills = async (
        characterId: string,
        data: NewSkill[],
    ): Promise<Result<SkillType[]>> => {
        return await $fetch<Result<SkillType[]>>(`/api/character/${characterId}/skill`, {
            method: 'POST',
            body: data,
        })
    }

    const patchSkills = async (
        characterId: string,
        data: SkillUpdate[],
    ): Promise<Result<SkillType[]>> => {
        return await $fetch<Result<SkillType[]>>(`/api/character/${characterId}/skill`, {
            method: 'PATCH',
            body: data,
        })
    }

    const deleteSkills = async (
        characterId: string,
        skillIds: string[],
    ): Promise<Result<Deletion>> => {
        return await $fetch<Result<Deletion>>(`/api/character/${characterId}/skill`, {
            method: 'DELETE',
            body: skillIds,
        })
    }

    const postItems = async (characterId: string, data: NewItem[]): Promise<Result<ItemType[]>> => {
        return await $fetch<Result<ItemType[]>>(`/api/character/${characterId}/item`, {
            method: 'POST',
            body: data,
        })
    }

    const deleteItems = async (
        characterId: string,
        itemIds: string[],
    ): Promise<Result<Deletion>> => {
        return await $fetch<Result<Deletion>>(`/api/character/${characterId}/item`, {
            method: 'DELETE',
            body: itemIds,
        })
    }

    return {
        post,
        getSheet,
        patch,
        postSkills,
        patchSkills,
        deleteSkills,
        postItems,
        deleteItems,
    }
}
