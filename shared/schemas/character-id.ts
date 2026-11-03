import z from 'zod'

export const characterIdSchema = z.cuid2('ID do personagem inválido')
