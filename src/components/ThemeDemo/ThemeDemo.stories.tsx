import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDemo } from './ThemeDemo'

const meta: Meta<typeof ThemeDemo> = {
  title: 'Foundations/Theme Demo',
  component: ThemeDemo,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ThemeDemo>

export const Default: Story = {}
