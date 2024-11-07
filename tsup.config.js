import { defineConfig } from 'tsup';
export default defineConfig({
  entryPoints: ['src/luhn.ts', 'src/luhnOptimized.ts'],
  outDir: 'dist',
  target: 'node18',
  format: ['esm'],
  treeshake: true,
  clean: true,
  minify: true
});