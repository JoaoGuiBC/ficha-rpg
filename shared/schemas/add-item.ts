import z from 'zod'

import { itemCategorySchema } from '../types/item-category'
import { itemRaritySchema } from '../types/item-rarity'

export const newItemSchema = z.object({
    id: z.cuid2('ID do item inválido'),
    name: z.string('Nome do item inválido').trim().min(1, 'Nome do item inválido'),
    description: z
        .string('Descrição do item inválida')
        .trim()
        .max(255, 'Descrição do item inválida')
        .nullable()
        .optional(),
    type: itemCategorySchema,
    rarity: itemRaritySchema.optional(),
})

export type NewItem = z.infer<typeof newItemSchema>
