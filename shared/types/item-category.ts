import { z } from 'zod'

export const itemCategorySchema = z.enum([
    'ARMA CURTA',
    'ARMA LONGA',
    'ARMA PESADA',
    'DIST. CURTA',
    'DIST. LONGA',
    'OUTRO',
])

export const itemCategories = itemCategorySchema.options
export type ItemCategory = z.infer<typeof itemCategorySchema>
