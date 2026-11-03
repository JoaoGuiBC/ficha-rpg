import { parseServerEnv } from '../utils/env'

export default defineNitroPlugin(() => {
    const config = useRuntimeConfig()

    parseServerEnv({ NUXT_DATABASE_URL: config.databaseUrl })
})
