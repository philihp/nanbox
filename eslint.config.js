const js = require('@eslint/js')

module.exports = [
  js.configs.recommended,
  {
    files: ['**/__tests__/*.js'],
    languageOptions: {
      globals: {
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      },
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
    },
  },
]
