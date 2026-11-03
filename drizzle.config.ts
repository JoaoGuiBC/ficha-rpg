import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { parseMigrationEnv } from './server/utils/env'

const env = parseMigrationEnv(process.env)

export default defineConfig({
    dialect: 'postgresql',
    schema: './server/db/schema/index.ts',
    out: './drizzle',
    dbCredentials: { url: env.DATABASE_URL_UNPOOLED },
})
