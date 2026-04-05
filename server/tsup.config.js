import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  bundle: true,
  platform: 'node',
  target: 'node20',
  treeshake: true,
  splitting: false,
  minify: process.env.NODE_ENV === 'production',
  tsconfig: './tsconfig.json',
  external: ['express'],
});
