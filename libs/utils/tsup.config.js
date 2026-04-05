import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  bundle: true,
  treeshake: true,
  splitting: false,
  minify: process.env.NODE_ENV === 'production',
  tsconfig: './tsconfig.json',
});
