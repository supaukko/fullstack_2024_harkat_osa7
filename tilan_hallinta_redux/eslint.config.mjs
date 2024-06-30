import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    ignores: [
      '**/dist/',
      '**/node_modules/',
      '**/vite.config.js',
      'bloglist-frontend/'
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { 
        ...globals.browser,
        ...globals.node 
      }
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/linebreak-style': ['warn', 'unix'],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-unreachable': 'warn',
      'prefer-const': 'warn',
      'no-undef': 'warn',
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'arrow-spacing': [
        'error', {
          'before': true,
          'after': true
        }
      ]
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
];