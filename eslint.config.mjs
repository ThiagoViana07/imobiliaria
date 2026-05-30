import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node, // // injeta __dirname, __filename, process, Buffer, etc.
      },
      ecmaVersion: 'latest',
      sourceType: 'module', // troque para "module" se usar ESM (type: "module" no package.json)
    },
    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    rules: {
      // Variáveis não utilizadas
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Imports inexistentes / não resolvidos
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/no-duplicates': 'warn',

      // Boas práticas JS
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-undef': 'error', // funções/variáveis não declaradas
      'no-use-before-define': ['error', { functions: false }],
      eqeqeq: ['error', 'always'],
    },
  },
  prettierConfig,
];
