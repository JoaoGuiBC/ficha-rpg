import type { ItemCategory } from './item-category'
import type { ItemRarity } from './item-rarity'

export type ItemType = {
    characterId: string
    name: string
    description: string | null
    type: ItemCategory
    rarity?: ItemRarity
    id: string
}
