import { z } from 'zod'

const postgresUrl = z
    .string()
    .min(1, 'está vazia ou não foi definida')
    .regex(/^postgres(ql)?:\/\//, 'precisa começar com postgresql://')

export const serverEnvSchema = z.object({
    NUXT_DATABASE_URL: postgresUrl,
})

export const migrationEnvSchema = z.object({
    DATABASE_URL_UNPOOLED: postgresUrl,
})

function parseEnv<T extends z.ZodType>(schema: T, input: unknown): z.infer<T> {
    const result = schema.safeParse(input)

    if (!result.success) {
        const lines = result.error.issues.map(
            issue => `  - ${issue.path.join('.')}: ${issue.message}`,
        )

        throw new Error(`Variáveis de ambiente inválidas:\n${lines.join('\n')}`)
    }

    return result.data
}

export const parseServerEnv = (input: unknown) => parseEnv(serverEnvSchema, input)
export const parseMigrationEnv = (input: unknown) => parseEnv(migrationEnvSchema, input)
