import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import securityPlugin from 'eslint-plugin-security';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

import js from '@eslint/js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  // Глобальные игноры
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.d.ts', 'coverage/**', '*.config.js', 'eslint.config.js'],
  },

  // Базовые рекомендованные правила для JS
  js.configs.recommended,

  // Рекомендованные правила для TypeScript
  ...tseslint.configs.recommended,

  // Отключаем конфликтующие с Prettier правила
  prettierConfig,

  // Основная конфигурация для сервера
  {
    name: 'server-config',
    files: ['src/**/*.ts', 'src/**/*.js', 'test/**/*.ts'],
    ignores: ['dist/**', 'node_modules/**', '**/*.d.ts', 'coverage/**', '*.config.js', 'eslint.config.js'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node, // Node.js глобалы (process, __dirname и т.д.)
        ...globals.jest, // если используете Jest для тестов
      },
      parserOptions: {
        project: './tsconfig.json', // для правил, требующих типов
        tsconfigRootDir: __dirname,
      },
    },

    plugins: {
      n: nodePlugin,
      import: importPlugin,
      security: securityPlugin,
    },

    rules: {
      // ----- Общие правила -----
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // отключаем в пользу TypeScript правила
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off', // в Express часто не нужен
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ----- Node.js правила (plugin:n/recommended) -----
      'n/no-unsupported-features/es-syntax': 'off', // отключаем, т.к. используем TypeScript
      'n/no-missing-import': 'off', // TypeScript сам проверит
      'n/no-process-exit': 'warn', // предупреждать о process.exit()
      'n/hashbang': 'off',

      // ----- Import plugin -----
      'import/no-unresolved': 'off', // TypeScript проверяет лучше
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //     'newlines-between': 'always',
      //     alphabetize: { order: 'asc', caseInsensitive: true },
      //   },
      // ],
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.spec.ts', 'test/**'] }],

      // ----- Security plugin (базовые) -----
      'security/detect-object-injection': 'off', // слишком шумно
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-unsafe-regex': 'warn',
      'security/detect-buffer-noassert': 'warn',
      'security/detect-child-process': 'warn',
      'security/detect-disable-mustache-escape': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-non-literal-require': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',
      'security/detect-possible-timing-attacks': 'warn',

      // ----- Специфичные для Express / Sequelize -----
      'no-sync': 'warn', // избегать синхронных методов fs
      'handle-callback-err': 'error',
      'consistent-return': 'warn',
    },

    settings: {
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
  },

  // Дополнительная конфигурация для тестов (если нужно ослабить правила)
  {
    name: 'test-config',
    files: ['test/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'security/detect-non-literal-fs-filename': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
]);
