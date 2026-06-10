import globals from 'globals'
import js from '@eslint/js'

export default [{ ignores: ['dist/'] }, js.configs.recommended, { languageOptions: { globals: globals.node } }]
