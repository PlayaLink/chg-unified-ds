import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Field } from './Field'

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      table: { category: 'Appearance' },
    },
    // Content
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    isRequired: {
      control: 'boolean',
      table: { category: 'Content' },
    },
    infoText: {
      control: 'text',
      table: { category: 'Content' },
    },
    showInfoIcon: {
      control: 'boolean',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      table: { category: 'Content' },
    },
    showCounter: {
      control: 'boolean',
      table: { category: 'Content' },
    },
    currentCount: {
      control: 'number',
      table: { category: 'Content' },
    },
    maxCount: {
      control: 'number',
      table: { category: 'Content' },
    },
    // Advanced
    className: {
      control: 'text',
      table: { category: 'Advanced' },
    },
  },
  args: {
    label: 'Label',
    orientation: 'vertical',
    isRequired: false,
    showInfoIcon: false,
    showCounter: false,
  },
}

export default meta
type Story = StoryObj<typeof Field>

// Mock input slot component for demo purposes
const MockInput = () => (
  <div className="flex h-40 w-full items-center rounded-4 border border-dashed border-orange-400 bg-base-white px-12">
    <span className="text-sm text-gray-500">Input placeholder</span>
  </div>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-48">
      {/* Orientation */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Orientation</span>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Vertical</span>
            <Field label="Label" className="w-320">
              <MockInput />
            </Field>
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Horizontal</span>
            <Field label="Label" orientation="horizontal" className="w-424">
              <MockInput />
            </Field>
          </div>
        </div>
      </div>

      {/* Required */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Required</span>
        <div className="flex flex-wrap gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Not Required</span>
            <Field label="Label" className="w-320">
              <MockInput />
            </Field>
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Required</span>
            <Field label="Label" isRequired className="w-320">
              <MockInput />
            </Field>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Helper Text</span>
        <div className="flex flex-wrap gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Without Helper</span>
            <Field label="Label" className="w-320">
              <MockInput />
            </Field>
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">With Helper</span>
            <Field label="Label" helperText="Helper Message" className="w-320">
              <MockInput />
            </Field>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Counter</span>
        <div className="flex flex-wrap gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Without Counter</span>
            <Field label="Label" className="w-320">
              <MockInput />
            </Field>
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">With Counter</span>
            <Field label="Label" showCounter currentCount={25} maxCount={100} className="w-320">
              <MockInput />
            </Field>
          </div>
        </div>
      </div>

      {/* Info (Horizontal) */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Info (Horizontal)</span>
        <div className="flex flex-wrap gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">With Info Text</span>
            <Field label="Label" orientation="horizontal" infoText="Info" className="w-424">
              <MockInput />
            </Field>
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">With Info Icon</span>
            <Field label="Label" orientation="horizontal" infoText="Info" showInfoIcon className="w-424">
              <MockInput />
            </Field>
          </div>
        </div>
      </div>

      {/* Full Example */}
      <div className="flex flex-col gap-16">
        <span className="text-sm font-medium text-gray-500">Full Example</span>
        <div className="flex flex-wrap gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Vertical - All Options</span>
            <Field
              label="Label"
              isRequired
              helperText="Helper Message"
              showCounter
              currentCount={42}
              maxCount={100}
              className="w-320"
            >
              <MockInput />
            </Field>
          </div>
          <div className="flex flex-col gap-8">
            <span className="text-xs text-gray-400">Horizontal - All Options</span>
            <Field
              label="Label"
              orientation="horizontal"
              isRequired
              infoText="Info"
              showInfoIcon
              helperText="Helper Message"
              showCounter
              currentCount={42}
              maxCount={100}
              className="w-424"
            >
              <MockInput />
            </Field>
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
    label: 'Label',
    orientation: 'vertical',
    isRequired: false,
    helperText: 'Helper Message',
    showCounter: true,
    currentCount: 25,
    maxCount: 100,
  },
  render: (args) => (
    <Field {...args} className="w-320">
      <MockInput />
    </Field>
  ),
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
          href="https://github.com/jordanchghealthcare/chg-unified-ds/tree/main/src/components/Field"
          target="_blank"
          rel="noopener noreferrer"
          iconLeading={GitHubIcon}
          className="bg-[#24292e] hover:bg-[#1b1f23]"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4501-15801"
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
