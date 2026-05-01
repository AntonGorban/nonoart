// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
// const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
// const importPlugin = require('eslint-plugin-import');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const reactCompiler = require('eslint-plugin-react-compiler');

module.exports = defineConfig([
  // Базовый конфиг от Expo (уже включает React, RN, TypeScript)
  expoConfig,

  // Глобальные игноры
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.expo/**',
      'ios/**',
      'android/**',
      '**/*.d.ts',
      'coverage/**',
      '*.config.js',
      '*.config.cjs',
    ],
  },

  // Дополнительные плагины и правила
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      // 'react-hooks': reactHooks,
      'react-native': reactNative,
      // import: importPlugin,
      'jsx-a11y': jsxA11y,
      'react-compiler': reactCompiler,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname, // важно для монорепозитория
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      // ----- React Hooks (уже есть в expo-config, но добавим для наглядности) -----
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ----- React Native -----
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': ['warn', { skip: ['CustomText'] }],
      'react-native/sort-styles': 'off',

      // ----- Import порядок и чистота -----
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
        { devDependencies: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**'] },
      ],
      'import/no-default-export': 'off', // Expo требует default export в app/_layout и т.д.

      // ----- Accessibility (JSX A11y) -----
      'jsx-a11y/accessible-emoji': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/no-access-key': 'warn',

      // ----- React Compiler (если используете) -----
      'react-compiler/react-compiler': 'warn',

      // ----- TypeScript (уточнения поверх expo-config) -----
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ----- Общие правила -----
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'no-unused-expressions': 'error',

      /* -------------------------------------------------------------------------- */
      /*                                  MY RULES                                  */
      /* -------------------------------------------------------------------------- */

      'react-native/no-inline-styles': 'off',
      'jsx-a11y/accessible-emoji': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/display-name': 'off',

      /* -------------------------------------------------------------------------- */
      /*                                 / MY RULES                                 */
      /* -------------------------------------------------------------------------- */
    },
  },

  // Специальные правила для файлов Expo Router (app/+not-found, app/_layout и т.д.)
  {
    files: ['app/**/*.{tsx,jsx}'],
    rules: {
      'import/no-default-export': 'off', // в роутере нужен default export
      'react-native/no-raw-text': 'off', // в навигации может быть текст без обёртки
    },
  },

  // Ослабление для тестов (если есть)
  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react-native/no-inline-styles': 'off',
    },
  },
]);
