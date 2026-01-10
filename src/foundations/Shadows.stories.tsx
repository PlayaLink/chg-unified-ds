import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundations/Shadows',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

const shadows = [
  {
    name: 'shadow-sm',
    value: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
    description: 'Subtle shadow for small UI elements like buttons and inputs.',
  },
  {
    name: 'shadow-default',
    value: '0px 1px 2px -1px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.15)',
    description: 'Standard shadow for cards and contained elements.',
  },
  {
    name: 'shadow-md',
    value: '0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.15)',
    description: 'Medium shadow for dropdowns and popovers.',
  },
  {
    name: 'shadow-lg',
    value: '0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.15)',
    description: 'Large shadow for modals and dialogs.',
  },
  {
    name: 'shadow-xl',
    value: '0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.15)',
    description: 'Extra large shadow for elevated elements.',
  },
  {
    name: 'shadow-2xl',
    value: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    description: 'Maximum elevation shadow for prominent overlays.',
  },
  {
    name: 'shadow-inner',
    value: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    description: 'Inset shadow for pressed states or recessed elements.',
  },
]

const ShadowCard = ({
  name,
  value,
}: {
  name: string
  value: string
}) => (
  <div
    style={{
      width: '240px',
      height: '240px',
      backgroundColor: '#f3f4f6',
      border: '1px solid #9ca2ae',
      borderRadius: '12px',
      boxShadow: value,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '20px',
    }}
  >
    <span style={{ fontSize: '18px', color: '#000' }}>{name}</span>
  </div>
)

export const Overview: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: '#181d27', marginBottom: '12px' }}>
          Shadows
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7380', maxWidth: '720px', lineHeight: 1.5 }}>
          Shadows enhance depth and realism in designs by creating a sense of hierarchy and spatial
          positioning along the z-axis. They help differentiate elements, improve legibility, and
          add a subtle layer of visual interest, making interfaces feel more dynamic and lifelike.
        </p>
      </div>

      {/* Shadow Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', marginBottom: '64px' }}>
        {shadows.map((shadow) => (
          <ShadowCard key={shadow.name} name={shadow.name} value={shadow.value} />
        ))}
      </div>

      {/* Token Reference */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#181d27', marginBottom: '24px' }}>
          Token Reference
        </h2>
        <div style={{ backgroundColor: '#f9fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e6e7eb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', padding: '12px 24px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e6e7eb' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#6b7380' }}>Token</span>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#6b7380' }}>Value</span>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#6b7380' }}>Usage</span>
          </div>
          {shadows.map((shadow, i) => (
            <div
              key={shadow.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr 1fr',
                padding: '16px 24px',
                borderBottom: i < shadows.length - 1 ? '1px solid #e6e7eb' : 'none',
              }}
            >
              <code style={{ fontSize: '14px', fontWeight: 500 }}>{shadow.name}</code>
              <code style={{ fontSize: '12px', color: '#6b7380', wordBreak: 'break-all' }}>{shadow.value}</code>
              <span style={{ fontSize: '14px', color: '#6b7380' }}>{shadow.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#181d27', marginBottom: '16px' }}>
          Usage
        </h2>
        <p style={{ fontSize: '14px', color: '#535862', marginBottom: '16px' }}>
          Shadows are available as Tailwind classes:
        </p>
        <pre
          style={{
            backgroundColor: '#f9fafc',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflow: 'auto',
          }}
        >
          <code>{`// Apply shadows to elements
<div className="shadow-sm" />
<div className="shadow" />      // shadow-default
<div className="shadow-md" />
<div className="shadow-lg" />
<div className="shadow-xl" />
<div className="shadow-2xl" />
<div className="shadow-inner" />

// Remove shadow
<div className="shadow-none" />

// Combine with hover states
<button className="shadow hover:shadow-md transition-shadow" />`}</code>
        </pre>
      </div>
    </div>
  ),
}
