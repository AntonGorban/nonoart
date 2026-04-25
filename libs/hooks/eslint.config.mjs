import { dirname } from 'path';
import { fileURLToPath } from 'url';

import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.d.ts', 'coverage/**', '*.config.js', 'eslint.config.js'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.es2021,
        // не добавляем browser или node, так как библиотека платформонезависима
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: '19.0',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Импорты
      'import/no-duplicates': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/src/**'],
              message: 'Do not import from src directly. Use the main entry point instead.',
            },
          ],
        },
      ],

      // Запрещаем использование платформозависимых глобалов
      'no-restricted-globals': [
        'error',
        {
          name: 'window',
          message: 'Use platform-agnostic abstractions. window is not available in React Native.',
        },
        {
          name: 'document',
          message: 'document is not available in React Native.',
        },
        {
          name: 'localStorage',
          message: 'Use react-native-async-storage or web storage abstraction.',
        },
        {
          name: 'sessionStorage',
          message: 'Not available in React Native.',
        },
      ],

      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },

  // Ослабляем правила для тестов (если есть)
  {
    files: ['**/*.test.ts', '**/*.test.tsx', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-restricted-globals': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
);
