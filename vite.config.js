import { defineConfig } from 'vite';
import { resolve } from 'path';

// const isGitHubPages = true;
const isGitHubPagesBuild = process.env.GITHUB_PAGES_BUILD === 'true';

export default defineConfig({
   // base:
   //    process.env.NODE_ENV === 'production' && isGitHubPages ? '/test-gemini/' : '/',

   base: isGitHubPagesBuild ? '/accordion-menu/' : '/',
   plugins: [],

   resolve: {
      // 1. Налаштування Alias (Псевдонімів)
      alias: {
         // Це дозволяє імпортувати файли в JS/CSS так:
         // import style from '@styles/style.scss'
         '@styles': resolve(__dirname, './src/styles'),
         // import img from '@assets/img/test.png'
         '@assets': resolve(__dirname, './src/assets'),
         // import script from '@js/script.js'
         '@js': resolve(__dirname, './src/js'),
      },
   },

   server: {
      port: 3000,
      open: true,
   },

   build: {
      outDir: 'dist',
      sourcemap: true,

      rollupOptions: {
         input: {
            main: resolve(__dirname, 'index.html')
         },
         output: {
            assetFileNames: 'assets/[name].[hash].[ext]',
            chunkFileNames: 'assets/[name].[hash].js',
            entryFileNames: 'assets/[name].[hash].js',
         },
      },
   },
});
