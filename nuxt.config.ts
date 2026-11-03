import tailwindcss from '@tailwindcss/vite'

import { parseServerEnv } from './server/utils/env'

if (!process.env.SKIP_ENV_VALIDATION) {
    try {
        parseServerEnv(process.env)
    } catch (error) {
        console.error((error as Error).message)
        process.exit(1)
    }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['reka-ui/nuxt', '@nuxt/eslint', '@nuxt/fonts', '@pinia/nuxt'],

    imports: {
        dirs: ['composables/http'],
    },

    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    runtimeConfig: {
        databaseUrl: '',
    },

    compatibilityDate: '2025-07-15',

    vite: {
        plugins: [tailwindcss()],
    },

    hooks: {
        'pages:extend'(pages) {
            const page = pages.find(page => page.file?.endsWith('/app/pages/character/[id].vue'))

            if (page) {
                page.path = '/personagem/:id'
            }
        },
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                quotes: 'single',
            },
        },
    },

    fonts: {
        families: [
            { name: 'Fraunces', provider: 'google' },
            { name: 'Manrope', provider: 'google' },
        ],
    },
})
