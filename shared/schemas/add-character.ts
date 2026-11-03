import z from 'zod'

export const newCharacterSchema = z.object({
    name: z.string('Nome é obrigatório').trim().min(1, 'Nome é obrigatório'),
    description: z.string('Descrição é obrigatória').trim().min(1, 'Descrição é obrigatória'),
    tint: z.string('Cor é obrigatória').trim().min(1, 'Cor é obrigatória'),
    origin: z.string('Origem é obrigatória').trim().min(1, 'Origem é obrigatória'),
})

export type NewCharacter = z.infer<typeof newCharacterSchema>
