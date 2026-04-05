import { dirname } from 'path';
import { fileURLToPath } from 'url';

import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  // Глобальные игноры
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.d.ts',
      'coverage/**',
      '*.config.js',
      'eslint.config.js',
      'jest.config.ts',
      'vite.config.ts',
    ],
  },

  // Базовые правила JS и TS
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  // Основная конфигурация библиотеки
  {
    name: 'utils-lib-config',
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx', 'test/**/*.ts'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser, // если библиотека используется в браузере
        ...globals.es2021,
        ...globals.node, // если используется на сервере (но в целом не помешает)
        ...globals.jest,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname, // 👈 явно указываем текущую директорию
      },
    },

    plugins: {
      import: importPlugin,
    },

    rules: {
      // Общие правила TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // Сортировка импортов (полезно для библиотек)
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      //     'newlines-between': 'always',
      //     alphabetize: { order: 'asc', caseInsensitive: true },
      //   },
      // ],
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.ts', '**/*.spec.ts', 'test/**', '**/*.config.mjs'] },
      ],

      // Запрещаем импорт из src (только из dist или корня)
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/src/**'],
              message: 'Do not import from src directly. Use the main entry point (index) instead.',
            },
          ],
        },
      ],

      // Отключаем ненужные правила
      'no-console': 'warn',
      'no-debugger': 'warn',
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
  },

  // Ослабленные правила для тестов
  {
    name: 'test-config',
    files: ['test/**/*.ts', '**/*.spec.ts', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-restricted-imports': 'off',
    },
  },
]);
