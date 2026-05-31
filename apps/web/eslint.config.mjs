import nextVitals from 'eslint-config-next/core-web-vitals';

const nextTypescriptPlugin = nextVitals.find((config) => config.name === 'next/typescript')
  ?.plugins?.['@typescript-eslint'];

const eslintConfig = [
  ...nextVitals,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': nextTypescriptPlugin,
    },
    rules: {
      // WEFLOW custom rules — hex 하드코딩, console.log, etc.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', '.turbo/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
