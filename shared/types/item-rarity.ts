import { z } from 'zod'

export const itemRaritySchema = z.enum(['common', 'forged', 'purified', 'relic'])

export const itemRarities = itemRaritySchema.options
export type ItemRarity = z.infer<typeof itemRaritySchema>
