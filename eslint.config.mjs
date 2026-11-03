// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
            },
        ],
        '@stylistic/arrow-parens': ['error', 'as-needed'],
        '@stylistic/brace-style': 'off',
        '@stylistic/operator-linebreak': [
            'error',
            'after',
            {
                overrides: {
                    '|': 'before',
                },
            },
        ],
        '@stylistic/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: false,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
    },
})
