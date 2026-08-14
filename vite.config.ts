import { defineConfig } from 'vite';
import { birrVitePlugin } from './vite-plugin-birr.js';

export default defineConfig({
  plugins: [birrVitePlugin()],
  server: { port: 5182, host: true, allowedHosts: true },
  preview: { port: 4173, host: true, allowedHosts: true },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      external: ['node:fs/promises', 'node:path', 'node:fs'],
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
