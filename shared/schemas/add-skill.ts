import z from 'zod'

export const skillLevelSchema = z.coerce
    .number('Nível da perícia inválido')
    .int('Nível da perícia inválido')
    .refine(level => level === 5 || level === 10, 'Nível da perícia inválido')

export const newSkillSchema = z.object({
    id: z.cuid2('ID da perícia inválido'),
    name: z.string('Nome da perícia inválido').trim().min(1, 'Nome da perícia inválido'),
    level: skillLevelSchema.default(5),
})

export type NewSkill = z.infer<typeof newSkillSchema>
