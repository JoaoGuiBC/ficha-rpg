import { drizzle } from 'drizzle-orm/neon-http'

function createDb() {
    return drizzle(useRuntimeConfig().databaseUrl)
}

let db: ReturnType<typeof createDb> | undefined

export const useDb = () => (db ??= createDb())
