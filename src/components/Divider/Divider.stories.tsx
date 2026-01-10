import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Divider } from './Divider'

// Icon component for demos
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 1a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-3.5v3.5a.75.75 0 01-1.5 0v-3.5h-3.5a.75.75 0 010-1.5h3.5v-3.5A.75.75 0 016 1z" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5l1.85 4.45 4.65.4-3.55 3.05 1.1 4.6L8 11.55 3.95 14l1.1-4.6L1.5 6.35l4.65-.4L8 1.5z" />
  </svg>
)

// Icon mapping for Storybook controls
const iconOptions = {
  None: undefined,
  Plus: PlusIcon,
  Star: StarIcon,
}

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Appearance
    appearance: {
      control: 'select',
      options: ['solid', 'transparent'],
      table: { category: 'Appearance' },
    },
    alignment: {
      control: 'select',
      options: ['none', 'left', 'center', 'right'],
      table: { category: 'Appearance' },
    },
    type: {
      control: 'select',
      options: ['label', 'title', 'action', 'icon'],
      table: { category: 'Appearance' },
    },
    // Content
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    // Icons
    icon: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      table: { category: 'Icons' },
    },
    // Advanced
    className: {
      control: 'text',
      table: { category: 'Advanced' },
    },
  },
  args: {
    appearance: 'solid',
    alignment: 'center',
    type: 'label',
    label: 'Divider Label',
  },
}

export default meta
type Story = StoryObj<typeof Divider>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-80 px-48 pt-32 pb-48">
      {/* Alignment */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Alignment</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">None</span>
            <Divider alignment="none" />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Left</span>
            <Divider alignment="left" label="Divider Label" />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Center</span>
            <Divider alignment="center" label="Divider Label" />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Right</span>
            <Divider alignment="right" label="Divider Label" />
          </div>
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Type</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Label</span>
            <Divider type="label" alignment="center" label="Divider Label" />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Title</span>
            <Divider type="title" alignment="center" label="Divider Label" />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Action</span>
            <Divider type="action" alignment="center" label="Divider Label" icon={PlusIcon} />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Icon</span>
            <Divider type="icon" alignment="center" icon={StarIcon} />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Appearance</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Solid</span>
            <Divider appearance="solid" alignment="center" label="Divider Label" />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Transparent</span>
            <Divider appearance="transparent" alignment="center" label="Divider Label" />
          </div>
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
    appearance: 'solid',
    alignment: 'center',
    type: 'label',
    label: 'Divider Label',
  },
}

// =============================================================================
// SOURCE CODE + DESIGNS
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
          href="https://github.com/jordanchghealthcare/chg-unified-ds/tree/main/src/components/Divider"
          target="_blank"
          rel="noopener noreferrer"
          iconLeading={GitHubIcon}
          className="bg-[#24292e] hover:bg-[#1b1f23]"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=73-674"
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
