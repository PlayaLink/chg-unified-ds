import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Chip } from './Chip'

// Icon component for demos
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

// Icon mapping for Storybook controls
const iconOptions = {
  None: undefined,
  Star: StarIcon,
}

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['default', 'compact'],
      table: { category: 'Appearance' },
    },
    isRounded: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    // State
    isSelected: {
      control: 'boolean',
      table: { category: 'State' },
    },
    isDismissible: {
      control: 'boolean',
      table: { category: 'State' },
    },
    // Icons
    icon: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      table: { category: 'Icons' },
    },
    // Content
    children: {
      control: 'text',
      table: { category: 'Content' },
    },
    // Behavior
    onPress: {
      action: 'pressed',
      table: { category: 'Behavior' },
    },
    onDismiss: {
      action: 'dismissed',
      table: { category: 'Behavior' },
    },
    // Advanced
    className: {
      control: 'text',
      table: { category: 'Advanced' },
    },
  },
  args: {
    children: 'Label',
    size: 'default',
    isSelected: false,
    isRounded: false,
    isDismissible: false,
  },
}

export default meta
type Story = StoryObj<typeof Chip>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 px-48 pb-48 pt-32">
      {/* Selected */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Selected</span>
        <div className="flex items-center gap-4">
          <Chip>Unselected</Chip>
          <Chip isSelected>Selected</Chip>
        </div>
      </div>

      {/* Rounded */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Rounded</span>
        <div className="flex items-center gap-4">
          <Chip>Default</Chip>
          <Chip isRounded>Rounded</Chip>
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Size</span>
        <div className="flex items-center gap-4">
          <Chip size="default">Default</Chip>
          <Chip size="compact">Compact</Chip>
        </div>
      </div>

      {/* Icon */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Icon</span>
        <div className="flex items-center gap-4">
          <Chip>No Icon</Chip>
          <Chip icon={StarIcon}>With Icon</Chip>
        </div>
      </div>

      {/* Dismiss */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Dismiss</span>
        <div className="flex items-center gap-4">
          <Chip>Not Dismissible</Chip>
          <Chip isDismissible>Dismissible</Chip>
        </div>
      </div>

      {/* Combined */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Combined</span>
        <div className="flex items-center gap-4">
          <Chip icon={StarIcon} isDismissible>All Features</Chip>
          <Chip icon={StarIcon} isDismissible isSelected isRounded>Selected Pill</Chip>
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    children: 'Label',
    size: 'default',
    isSelected: false,
    isRounded: false,
    isDismissible: false,
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

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

export const SourceCodeAndDesign: Story = {
  name: 'Source Code + Designs',
  render: () => (
    <div className="flex min-w-[420px] flex-col items-center gap-24">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-gray-900">Source Code + Figma Designs</h2>
        <p className="text-md whitespace-nowrap text-gray-500">This component was built using the CHG Unified Design System</p>
      </div>
      <div className="flex gap-12">
        <Button
          href="https://github.com/jordanchghealthcare/chg-unified-ds/tree/main/src/components/Chip"
          target="_blank"
          rel="noopener noreferrer"
          iconLeading={GitHubIcon}
          className="bg-[#24292e] hover:bg-[#1b1f23]"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=722-9956"
          target="_blank"
          rel="noopener noreferrer"
          iconLeading={FigmaIcon}
          className="bg-[#A259FF] hover:bg-[#8B3DFF]"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
