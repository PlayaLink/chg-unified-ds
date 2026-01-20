import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Tabs } from './Tabs'

const sampleItems = [
  { id: 'tab1', label: 'Tab 1', content: <p className="text-gray-700">Content for Tab 1</p> },
  { id: 'tab2', label: 'Tab 2', content: <p className="text-gray-700">Content for Tab 2</p> },
  { id: 'tab3', label: 'Tab 3', content: <p className="text-gray-700">Content for Tab 3</p> },
]

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    appearance: {
      control: 'select',
      options: ['underline', 'block', 'block-inverted'],
      table: { category: 'Appearance' },
    },
    fill: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    // Content
    items: {
      control: false,
      table: { category: 'Content' },
    },
    // Behavior
    defaultSelectedKey: {
      control: 'text',
      table: { category: 'Behavior' },
    },
    // Advanced
    className: {
      control: 'text',
      table: { category: 'Advanced' },
    },
  },
  args: {
    appearance: 'underline',
    fill: false,
    items: sampleItems,
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tabs>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex w-[800px] flex-col gap-48 px-48 pb-48 pt-32">
      {/* Appearance */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Appearance</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Underline</span>
            <Tabs appearance="underline" items={sampleItems} />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Block</span>
            <Tabs appearance="block" items={sampleItems} />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Block Inverted</span>
            <Tabs appearance="block-inverted" items={sampleItems} />
          </div>
        </div>
      </div>

      {/* Fill */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Fill</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Default (no fill)</span>
            <Tabs appearance="block" fill={false} items={sampleItems} />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Fill (stretch to width)</span>
            <Tabs appearance="block" fill={true} items={sampleItems} />
          </div>
        </div>
      </div>

      {/* Tab Count */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Tab Count</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">2 Tabs</span>
            <Tabs
              appearance="underline"
              items={[
                { id: 't1', label: 'Tab 1', content: <p>Content 1</p> },
                { id: 't2', label: 'Tab 2', content: <p>Content 2</p> },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">4 Tabs</span>
            <Tabs
              appearance="underline"
              items={[
                { id: 't1', label: 'Tab 1', content: <p>Content 1</p> },
                { id: 't2', label: 'Tab 2', content: <p>Content 2</p> },
                { id: 't3', label: 'Tab 3', content: <p>Content 3</p> },
                { id: 't4', label: 'Tab 4', content: <p>Content 4</p> },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Tabs with Icons</span>
            <Tabs
              appearance="underline"
              items={[
                { id: 't1', label: 'New Report', icon: 'plus', content: <p>Content for New Report</p> },
                { id: 't2', label: 'Past Reports', icon: 'clock-counter-clockwise', content: <p>Content for Past Reports</p> },
                { id: 't3', label: 'Formatting', icon: 'sliders', content: <p>Content for Formatting</p> },
              ]}
            />
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
    appearance: 'underline',
    fill: false,
    items: sampleItems,
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
          href="https://github.com/jordanchghealthcare/chg-unified-ds/tree/main/src/components/Tabs"
          target="_blank"
          rel="noopener noreferrer"
          iconLeading={GitHubIcon}
          className="bg-[#24292e] hover:bg-[#1b1f23]"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=777-8875"
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
