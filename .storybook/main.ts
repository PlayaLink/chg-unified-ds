import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../src/foundations/**/*.mdx',
    '../src/foundations/**/*.stories.tsx',
    '../src/components/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite')

    // Use Storybook config with CSS variables for runtime theme switching
    const tailwindConfigPath = resolve(__dirname, '../tailwind.config.storybook.cjs')

    console.log('\n🎨 Loading Tailwind config: Storybook (runtime theme switching enabled)\n')

    return mergeConfig(config, {
      plugins: [tailwindcss({ config: tailwindConfigPath })],
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        },
      },
    })
  },
}

export default config
