import { resolve } from 'path'

export default {
  base: '',
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        payment: resolve(__dirname, 'payment.html'),
      },
      output: {
        compact: false
      }
    }
  },
  // скрытие Deprecation Warning для стилей bootstrap
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
          ],
        },
     },
  },
}