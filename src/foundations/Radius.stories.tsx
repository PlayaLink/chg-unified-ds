import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundations/Radius',
  tags: ['hide-panel'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

const radiusTokens = [
  { name: 'radius-0', value: '0px', pixels: 0 },
  { name: 'radius-2', value: '2px', pixels: 2 },
  { name: 'radius-4', value: '4px', pixels: 4 },
  { name: 'radius-6', value: '6px', pixels: 6 },
  { name: 'radius-8', value: '8px', pixels: 8 },
  { name: 'radius-12', value: '12px', pixels: 12 },
  { name: 'radius-16', value: '16px', pixels: 16 },
  { name: 'radius-20', value: '20px', pixels: 20 },
  { name: 'radius-24', value: '24px', pixels: 24 },
  { name: 'radius-full', value: '9999px', pixels: 9999 },
]

const RadiusCard = ({ name, pixels }: { name: string; pixels: number }) => (
  <div
    style={{
      width: '240px',
      height: '240px',
      backgroundColor: 'var(--sb-surface-tertiary)',
      border: '1px solid var(--sb-border-default)',
      borderRadius: pixels === 9999 ? '9999px' : `${pixels}px`,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '20px',
    }}
  >
    <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sb-text-strong)' }}>{name}</span>
  </div>
)

export const Overview: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '12px' }}>
          Radius
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5 }}>
          Use border radius values to quickly style the border-radius of an element. Border radius
          values are useful for rounding edges of images, buttons, or any other element. Just like
          pre-defined spacing values, working from a defined border radius system allows you to work
          faster and more consistently.
        </p>
      </div>

      {/* Radius Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', marginBottom: '64px' }}>
        {radiusTokens.map((token) => (
          <RadiusCard key={token.name} name={token.name} pixels={token.pixels} />
        ))}
      </div>

      {/* Token Reference */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          Radius
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5, marginBottom: '24px' }}>
          Working from a pre-defined and limited radius system for adding border radiuses (or radii)
          to elements allows you to work faster and consistently. CHG uses a pre-defined and limited
          radius system derived from the primitive spacing values.
        </p>
        <div
          style={{
            backgroundColor: 'var(--sb-surface-secondary)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--sb-border-default)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 100px 1fr',
              padding: '12px 24px',
              backgroundColor: 'var(--sb-surface-tertiary)',
              borderBottom: '1px solid var(--sb-border-default)',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--sb-text-body)' }}>
              Token
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--sb-text-body)' }}>
              Value
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--sb-text-body)' }}>
              Example
            </span>
          </div>
          {radiusTokens.map((token, i) => (
            <div
              key={token.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 100px 1fr',
                padding: '16px 24px',
                borderBottom: i < radiusTokens.length - 1 ? '1px solid var(--sb-border-default)' : 'none',
                alignItems: 'center',
              }}
            >
              <code style={{ fontSize: '14px', fontWeight: 500 }}>{token.name}</code>
              <span style={{ fontSize: '14px', color: 'var(--sb-text-body)' }}>{token.value}</span>
              <div
                style={{
                  width: '128px',
                  height: '40px',
                  backgroundColor: '#e7f1ff',
                  border: '2px solid #007bff',
                  borderRadius: token.pixels === 9999 ? '9999px' : `${token.pixels}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          Usage
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--sb-text-secondary)', marginBottom: '16px' }}>
          Border radius tokens are available as Tailwind classes. Note that our radius scale uses pixel values directly:
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
          <code>{`// Apply border radius to elements
<div className="rounded-0" />     // 0px (square corners)
<div className="rounded-2" />     // 2px
<div className="rounded-4" />     // 4px
<div className="rounded-6" />     // 6px
<div className="rounded-8" />     // 8px
<div className="rounded-12" />    // 12px
<div className="rounded-16" />    // 16px
<div className="rounded-20" />    // 20px
<div className="rounded-24" />    // 24px
<div className="rounded-full" />  // 9999px (pill shape)

// Apply to specific corners
<div className="rounded-t-8" />   // top corners only
<div className="rounded-b-12" />  // bottom corners only
<div className="rounded-l-8" />   // left corners only
<div className="rounded-r-8" />   // right corners only

// Individual corners
<div className="rounded-tl-8" />  // top-left only
<div className="rounded-tr-8" />  // top-right only
<div className="rounded-bl-8" />  // bottom-left only
<div className="rounded-br-8" />  // bottom-right only`}</code>
        </pre>
      </div>
    </div>
  ),
}
