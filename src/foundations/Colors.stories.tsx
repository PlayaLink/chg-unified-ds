import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// Swatch component for individual colors
const Swatch = ({
  name,
  value,
  variable,
}: {
  name: string
  value?: string
  variable?: string
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div
      style={{
        width: '64px',
        height: '56px',
        backgroundColor: variable ? `var(${variable})` : value,
        borderRadius: '8px',
        border: name === '25' || name === '50' || name === 'White' ? '1px solid var(--sb-border-light)' : 'none',
      }}
    />
    <span style={{ fontSize: '12px', color: 'var(--sb-text-secondary)' }}>{name}</span>
    <code style={{ fontSize: '10px', color: 'var(--sb-text-muted)' }}>{variable || value}</code>
  </div>
)

// Scale component for a row of colors
const ColorScale = ({
  title,
  description,
  colors,
}: {
  title: string
  description?: string
  colors: { name: string; value?: string; variable?: string }[]
}) => (
  <div style={{ marginBottom: '48px' }}>
    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sb-text-heading)', marginBottom: '8px' }}>{title}</h3>
    {description && (
      <p style={{ fontSize: '16px', color: 'var(--sb-text-body)', marginBottom: '24px', lineHeight: 1.5 }}>{description}</p>
    )}
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {colors.map((color) => (
        <Swatch key={color.name} {...color} />
      ))}
    </div>
  </div>
)

export const Overview: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '12px' }}>
          Colors
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5 }}>
          Our design system provides purposeful color styles as a strong foundation for any brand or
          project. With WCAG 2.2 contrast ratios built in, you can ensure accessibility and text
          legibility.
        </p>
      </div>

      {/* Foundation colors section */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '8px' }}>
          Foundation colors
        </h2>
        <p style={{ fontSize: '20px', color: 'var(--sb-text-body)', maxWidth: '800px', lineHeight: 1.5 }}>
          Foundation colors are the core set of colors in a design system that serve as the base for
          all other color applications. These colors are carefully selected to provide a strong,
          flexible foundation for branding, UI components, and accessibility.
        </p>
      </div>

      {/* Base Colors */}
      <ColorScale
        title="Base"
        description="Base colors—black, white, and transparent—provide fundamental contrast, clarity, and layering essential for building a flexible and accessible design system."
        colors={[
          { name: 'White', value: '#ffffff' },
          { name: 'Black', value: '#111828' },
        ]}
      />

      {/* Neutrals */}
      <ColorScale
        title="Neutrals"
        description="Neutral colors provide a balanced, versatile foundation for a design system, ensuring clarity, contrast, and adaptability across different UI elements and themes."
        colors={[
          { name: '50', value: '#f9fafc' },
          { name: '100', value: '#f3f4f6' },
          { name: '200', value: '#e6e7eb' },
          { name: '300', value: '#d2d5dc' },
          { name: '400', value: '#9ca2ae' },
          { name: '500', value: '#6b7380' },
          { name: '600', value: '#4c5564' },
          { name: '700', value: '#384152' },
          { name: '800', value: '#202938' },
          { name: '900', value: '#111828' },
        ]}
      />

      {/* Brand Primary */}
      <ColorScale
        title="Brand Primary"
        description="The brand color is your primary color, and is used across all interactive elements such as buttons, links, inputs, etc. This color can define the overall feel and can elicit emotion."
        colors={[
          { name: '50', variable: '--color-brand-50' },
          { name: '100', variable: '--color-brand-100' },
          { name: '200', variable: '--color-brand-200' },
          { name: '300', variable: '--color-brand-300' },
          { name: '400', variable: '--color-brand-400' },
          { name: '500', variable: '--color-brand-500' },
          { name: '600', variable: '--color-brand-600' },
          { name: '700', variable: '--color-brand-700' },
          { name: '800', variable: '--color-brand-800' },
          { name: '900', variable: '--color-brand-900' },
        ]}
      />

      {/* Brand Secondary */}
      <ColorScale
        title="Brand Secondary"
        description="This brand color functions as your secondary color, providing additional flexibility in supporting primary colors across interactive elements. It helps refine the visual hierarchy and reinforce the overall brand experience."
        colors={[
          { name: '50', variable: '--color-secondary-50' },
          { name: '100', variable: '--color-secondary-100' },
          { name: '200', variable: '--color-secondary-200' },
          { name: '300', variable: '--color-secondary-300' },
          { name: '400', variable: '--color-secondary-400' },
          { name: '500', variable: '--color-secondary-500' },
          { name: '600', variable: '--color-secondary-600' },
          { name: '700', variable: '--color-secondary-700' },
          { name: '800', variable: '--color-secondary-800' },
          { name: '900', variable: '--color-secondary-900' },
        ]}
      />

      {/* Error */}
      <ColorScale
        title="Error"
        description="Error colors are used across error states and in destructive actions. They communicate a destructive/negative action, such as removing a user from your team."
        colors={[
          { name: '50', value: '#fef2f2' },
          { name: '100', value: '#fee2e1' },
          { name: '200', value: '#fecbca' },
          { name: '300', value: '#fda5a4' },
          { name: '400', value: '#f87070' },
          { name: '500', value: '#f04444' },
          { name: '600', value: '#dc2625' },
          { name: '700', value: '#ba1c1d' },
          { name: '800', value: '#991b1c' },
          { name: '900', value: '#7f1d1e' },
        ]}
      />

      {/* Warning */}
      <ColorScale
        title="Warning"
        description="Warning colors can communicate that an action is potentially destructive or on-hold. These colors are commonly used in confirmations to grab the users' attention."
        colors={[
          { name: '50', value: '#fefce8' },
          { name: '100', value: '#fef9c3' },
          { name: '200', value: '#fef08a' },
          { name: '300', value: '#fde047' },
          { name: '400', value: '#facc15' },
          { name: '500', value: '#e9b308' },
          { name: '600', value: '#ca8a04' },
          { name: '700', value: '#a26208' },
          { name: '800', value: '#854e0e' },
          { name: '900', value: '#723f12' },
        ]}
      />

      {/* Success */}
      <ColorScale
        title="Success"
        description="Success colors are used to communicate positive outcomes, completed actions, or confirmations. They reinforce a sense of accomplishment and guide users toward successful interactions."
        colors={[
          { name: '50', value: '#f0fdf4' },
          { name: '100', value: '#dcfce7' },
          { name: '200', value: '#bbf7d1' },
          { name: '300', value: '#86efac' },
          { name: '400', value: '#4ade80' },
          { name: '500', value: '#23c55e' },
          { name: '600', value: '#17a34a' },
          { name: '700', value: '#157f3d' },
          { name: '800', value: '#176535' },
          { name: '900', value: '#15532e' },
        ]}
      />

      {/* Dark Overlays */}
      <ColorScale
        title="Dark Overlays"
        description="Dark overlays are used to create contrast and focus by dimming the background, making foreground elements stand out. They are ideal for modals, dialogs, or emphasis on critical content."
        colors={[
          { name: '10%', value: 'rgba(0, 0, 0, 0.1)' },
          { name: '20%', value: 'rgba(0, 0, 0, 0.2)' },
          { name: '30%', value: 'rgba(0, 0, 0, 0.3)' },
          { name: '40%', value: 'rgba(0, 0, 0, 0.4)' },
          { name: '50%', value: 'rgba(0, 0, 0, 0.5)' },
        ]}
      />

      {/* Light Overlays */}
      <ColorScale
        title="Light Overlays"
        description="Light overlays soften the background, providing a subtle contrast for focused content. They work well for tooltips, highlights, and lightweight modals where a softer visual hierarchy is needed."
        colors={[
          { name: '10%', value: 'rgba(255, 255, 255, 0.1)' },
          { name: '20%', value: 'rgba(255, 255, 255, 0.2)' },
          { name: '30%', value: 'rgba(255, 255, 255, 0.3)' },
          { name: '40%', value: 'rgba(255, 255, 255, 0.4)' },
          { name: '50%', value: 'rgba(255, 255, 255, 0.5)' },
        ]}
      />

      {/* Usage */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          Usage
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--sb-text-secondary)', marginBottom: '16px' }}>
          Colors are available as Tailwind classes:
        </p>
        <pre
          style={{
            backgroundColor: 'var(--sb-surface-secondary)',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflow: 'auto',
          }}
        >
          <code>{`// Background colors
<div className="bg-brand-600" />
<div className="bg-gray-100" />
<div className="bg-error-500" />

// Text colors
<span className="text-gray-900" />
<span className="text-brand-700" />

// Border colors
<div className="border-gray-200" />

// Base colors (both forms work)
<div className="bg-white" />
<span className="text-black" />
// Or with 'base-' prefix
<div className="bg-base-white" />
<span className="text-base-black" />`}</code>
        </pre>
      </div>
    </div>
  ),
}
