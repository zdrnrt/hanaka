import { resolve } from 'path'

export default {
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