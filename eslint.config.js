import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    plugins: {
      import: importPlugin,
    },
  },
  {
    rules: {
      'react/prop-types': 'off', // Disable react/prop-types globally
      'eol-last': ['error', 'always'],
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            orderImportKind: 'asc',
          },
          groups: ['external', 'builtin', 'internal'],
          'newlines-between': 'always',
        },
      ],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
      'one-var': ['warn', 'never'],
      '@typescript-eslint/no-explicit-any': 'off',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],
      semi: ['warn', 'never'],
      'sort-imports': [
        'warn',
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
        },
      ],
      'sort-vars': ['warn', { ignoreCase: false }],
    },
  },
]
