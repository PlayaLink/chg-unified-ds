import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['default', 'condensed'],
      table: { category: 'Appearance' },
    },
    state: {
      control: 'select',
      options: ['default', 'error'],
      table: { category: 'Appearance' },
    },
    // State
    isDisabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    // Content
    placeholder: {
      control: 'text',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      table: { category: 'Content' },
    },
    // Behavior
    onPress: {
      action: 'pressed',
      table: { category: 'Behavior' },
    },
    // Advanced
    className: {
      control: 'text',
      table: { category: 'Advanced' },
    },
  },
  args: {
    placeholder: 'Select an option',
    size: 'default',
    state: 'default',
    isDisabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Dropdown>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-24">
      {/* Size */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Size</span>
        <div className="flex flex-col gap-8">
          <Dropdown size="default" placeholder="Default size" />
          <Dropdown size="condensed" placeholder="Condensed size" />
        </div>
      </div>

      {/* State */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">State</span>
        <div className="flex flex-col gap-8">
          <Dropdown state="default" placeholder="Default state" />
          <Dropdown state="error" placeholder="Error state" />
          <Dropdown isDisabled placeholder="Disabled state" />
        </div>
      </div>

      {/* With selected value */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Value</span>
        <div className="flex flex-col gap-8">
          <Dropdown>Option selected</Dropdown>
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// INTERACTIVE (with controls)
// =============================================================================

export const Interactive: Story = {
  args: {
    placeholder: 'Select an option',
    size: 'default',
    state: 'default',
    isDisabled: false,
  },
}

// =============================================================================
// FIGMA
// =============================================================================

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 38 57" fill="currentColor">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
  </svg>
)

export const Figma: Story = {
  render: () => (
    <a
      href="https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=23-944"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-8 rounded-8 bg-gray-900 px-16 py-10 text-sm font-medium text-base-white hover:bg-gray-800"
    >
      <FigmaIcon className="size-[16px]" />
      View in Figma
    </a>
  ),
}
