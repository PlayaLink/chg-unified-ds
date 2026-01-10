import type { Meta, StoryObj } from '@storybook/react'
import { Radio, RadioGroup } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    showLabel: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    // State
    isDisabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    // Content
    children: {
      control: 'text',
      table: { category: 'Content' },
    },
    // Advanced
    className: {
      control: 'text',
      table: { category: 'Advanced' },
    },
  },
  args: {
    children: 'Label',
    showLabel: true,
    isDisabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Radio>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      {/* Display Label */}
      <div className="flex flex-col gap-8">
        <span className="text-sm font-medium text-gray-500">Display Label</span>
        <div className="flex flex-col gap-8">
          <RadioGroup defaultValue="with-label">
            <Radio value="with-label">With Label</Radio>
          </RadioGroup>
          <RadioGroup defaultValue="no-label">
            <Radio value="no-label" showLabel={false}>Hidden Label</Radio>
          </RadioGroup>
        </div>
      </div>

      {/* Active State */}
      <div className="flex flex-col gap-8">
        <span className="text-sm font-medium text-gray-500">Active State</span>
        <div className="flex flex-col gap-8">
          <RadioGroup>
            <Radio value="inactive">Inactive</Radio>
          </RadioGroup>
          <RadioGroup defaultValue="active">
            <Radio value="active">Active (Selected)</Radio>
          </RadioGroup>
        </div>
      </div>

      {/* Disabled State */}
      <div className="flex flex-col gap-8">
        <span className="text-sm font-medium text-gray-500">Disabled State</span>
        <div className="flex flex-col gap-8">
          <RadioGroup isDisabled>
            <Radio value="disabled">Disabled</Radio>
          </RadioGroup>
          <RadioGroup isDisabled defaultValue="disabled-selected">
            <Radio value="disabled-selected">Disabled Selected</Radio>
          </RadioGroup>
        </div>
      </div>

      {/* Radio Group */}
      <div className="flex flex-col gap-8">
        <span className="text-sm font-medium text-gray-500">Radio Group</span>
        <RadioGroup defaultValue="option-1">
          <Radio value="option-1">Option 1</Radio>
          <Radio value="option-2">Option 2</Radio>
          <Radio value="option-3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
}

// =============================================================================
// INTERACTIVE (with controls)
// =============================================================================

export const Interactive: Story = {
  render: (args) => (
    <RadioGroup defaultValue="interactive">
      <Radio value="interactive" {...args} />
    </RadioGroup>
  ),
  args: {
    children: 'Label',
    showLabel: true,
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
      href="https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=5282-1239"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-8 rounded-8 bg-gray-900 px-16 py-10 text-sm font-medium text-base-white hover:bg-gray-800"
    >
      <FigmaIcon className="size-[16px]" />
      View in Figma
    </a>
  ),
}
