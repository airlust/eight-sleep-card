import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/eight-sleep-card.ts'),
      name: 'EightSleepCard',
      fileName: () => 'eight-sleep-card.js',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: false,
  },
});
