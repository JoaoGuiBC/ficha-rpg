import type { CharacterType } from './character-type'
import type { ItemType } from './item-type'
import type { SkillType } from './skill-type'

export type CharacterSheet = {
    character: CharacterType
    skills: SkillType[]
    items: ItemType[]
}
