import type { Preview } from '@storybook/react'
import { useEffect } from 'react'
import '../src/styles/globals.css'

// Import all brand theme CSS variables (light mode)
import './themes/weatherby.css'
import './themes/comphealth.css'
import './themes/modio.css'
import './themes/connect.css'
import './themes/locumsmart.css'
import './themes/wireframe.css'

// Storybook story theming (light/dark mode adaptation)
import './story-theme.css'

// Import all brand theme CSS variables (dark mode)
import './themes/weatherby-dark.css'
import './themes/comphealth-dark.css'
import './themes/modio-dark.css'
import './themes/connect-dark.css'
import './themes/locumsmart-dark.css'
import './themes/wireframe-dark.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography', 'Shadows', 'Spacing', 'Radius'],
          'Components',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Brand theme for components',
      defaultValue: 'weatherby',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'weatherby', title: 'Weatherby', icon: 'circle' },
          { value: 'comphealth', title: 'CompHealth', icon: 'circle' },
          { value: 'modio', title: 'Modio', icon: 'circle' },
          { value: 'connect', title: 'Connect', icon: 'circle' },
          { value: 'locumsmart', title: 'LocumSmart', icon: 'circle' },
          { value: 'wireframe', title: 'Wireframe', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Color mode (light/dark)',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'weatherby'
      const colorMode = context.globals.colorMode || 'light'

      useEffect(() => {
        // Apply theme and color mode to document root
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.setAttribute('data-mode', colorMode)
        document.body.style.backgroundColor = colorMode === 'dark' ? 'var(--uds-surface-primary)' : ''
        document.body.style.color = colorMode === 'dark' ? 'var(--uds-text-primary)' : ''
      }, [theme, colorMode])

      return (
        <div data-theme={theme} data-mode={colorMode}>
          <Story />
        </div>
      )
    },
  ],
}

export default preview
