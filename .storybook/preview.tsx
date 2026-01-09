import type { Preview } from '@storybook/react'
import { useEffect } from 'react'
import '../src/styles/globals.css'

// Import all brand theme CSS variables
import './themes/weatherby.css'
import './themes/comphealth.css'
import './themes/modio.css'
import './themes/connect.css'
import './themes/locumsmart.css'
import './themes/wireframe.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
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
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'weatherby'

      useEffect(() => {
        // Apply theme class to document root
        document.documentElement.setAttribute('data-theme', theme)
      }, [theme])

      return (
        <div data-theme={theme}>
          <Story />
        </div>
      )
    },
  ],
}

export default preview
