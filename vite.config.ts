import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'

// Plugin to copy CSS files to dist
function copyStylesPlugin() {
  return {
    name: 'copy-styles',
    closeBundle() {
      // Ensure dist/styles and dist/themes directories exist
      if (!existsSync('dist/styles')) mkdirSync('dist/styles', { recursive: true })
      if (!existsSync('dist/themes')) mkdirSync('dist/themes', { recursive: true })

      // Copy token files
      copyFileSync('src/styles/tokens.css', 'dist/styles/tokens.css')
      copyFileSync('src/styles/globals.css', 'dist/styles/globals.css')

      // Copy theme files
      const themes = [
        'weatherby', 'weatherby-dark',
        'comphealth', 'comphealth-dark',
        'connect', 'connect-dark',
        'locumsmart', 'locumsmart-dark',
        'modio', 'modio-dark',
        'wireframe', 'wireframe-dark'
      ]
      themes.forEach(theme => {
        copyFileSync(`.storybook/themes/${theme}.css`, `dist/themes/${theme}.css`)
      })

      console.log('✓ Copied CSS files to dist/')
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
    }),
    copyStylesPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CHGDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-aria-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-aria-components': 'ReactAriaComponents',
        },
      },
    },
  },
})
