import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve, join } from 'path'

const config: StorybookConfig = {
  stories: [
    '../src/foundations/**/*.mdx',
    '../src/foundations/**/*.stories.tsx',
    '../src/components/**/*.stories.tsx',
    '../src/patterns/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite')

    // Use Storybook config with CSS variables for runtime theme switching
    const tailwindConfigPath = join(process.cwd(), 'tailwind.config.storybook.cjs')

    console.log('\n🎨 Loading Tailwind config: Storybook (runtime theme switching enabled)\n')

    return mergeConfig(config, {
      plugins: [tailwindcss({ config: tailwindConfigPath })],
      resolve: {
        alias: {
          '@': join(process.cwd(), 'src'),
        },
      },
    })
  },
}

export default config
