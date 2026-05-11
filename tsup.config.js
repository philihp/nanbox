import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/__tests__/**', '!src/**/*.test.*'],
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'node22',
})
