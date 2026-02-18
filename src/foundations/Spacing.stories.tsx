import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['hide-panel'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

const spacingTokens = [
  { name: 'spacing-0', value: '0px', pixels: 0 },
  { name: 'spacing-2', value: '2px', pixels: 2 },
  { name: 'spacing-4', value: '4px', pixels: 4 },
  { name: 'spacing-6', value: '6px', pixels: 6 },
  { name: 'spacing-8', value: '8px', pixels: 8 },
  { name: 'spacing-10', value: '10px', pixels: 10 },
  { name: 'spacing-12', value: '12px', pixels: 12 },
  { name: 'spacing-14', value: '14px', pixels: 14 },
  { name: 'spacing-16', value: '16px', pixels: 16 },
  { name: 'spacing-18', value: '18px', pixels: 18 },
  { name: 'spacing-24', value: '24px', pixels: 24 },
  { name: 'spacing-32', value: '32px', pixels: 32 },
  { name: 'spacing-48', value: '48px', pixels: 48 },
  { name: 'spacing-64', value: '64px', pixels: 64 },
  { name: 'spacing-80', value: '80px', pixels: 80 },
]

const screenTokens = [
  { name: 'screen-mobile-min', value: '375px', pixels: 375 },
  { name: 'screen-mobile-max', value: '680px', pixels: 680 },
  { name: 'screen-tablet-min', value: '681px', pixels: 681 },
  { name: 'screen-tablet-max', value: '1024px', pixels: 1024 },
  { name: 'screen-desktop-min', value: '1025px', pixels: 1025 },
  { name: 'screen-desktop-max', value: '1440px', pixels: 1440 },
]

const paragraphTokens = [
  { name: 'paragraph-max-width', value: '700px', pixels: 700 },
]

const SpacingBar = ({ name, value, pixels }: { name: string; value: string; pixels: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 60px 1fr',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid var(--sb-border-default)',
    }}
  >
    <code style={{ fontSize: '14px', fontWeight: 500 }}>{name}</code>
    <span style={{ fontSize: '14px', color: 'var(--sb-text-body)' }}>{value}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: `${pixels}px`,
          height: '24px',
          backgroundColor: 'var(--color-brand-500)',
          borderRadius: '4px',
          minWidth: pixels === 0 ? '2px' : undefined,
          opacity: pixels === 0 ? 0.3 : 1,
        }}
      />
      {pixels > 0 && (
        <span style={{ fontSize: '12px', color: 'var(--sb-text-dim)' }}>{pixels}px</span>
      )}
    </div>
  </div>
)

export const Overview: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '12px' }}>
          Spacing
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5 }}>
          Just like your color scale, working from a defined spacing system allows you to work faster
          and more consistently. Consistent and scalable spacing helps you eliminate guesswork whilst
          designing and developing because you are designing with a limited set of options.
        </p>
      </div>

      {/* Base Unit */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          4px Base Unit
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5, marginBottom: '24px' }}>
          Our spacing system is built on a 4px base unit. This creates a consistent rhythm throughout
          the interface while allowing for fine-grained control when needed. The scale includes both
          4px increments and select intermediate values for flexibility.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '4px',
            padding: '24px',
            backgroundColor: 'var(--sb-surface-secondary)',
            borderRadius: '8px',
            border: '1px solid var(--sb-border-default)',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: '32px',
                backgroundColor: 'var(--color-brand-500)',
                borderRadius: '2px',
              }}
            />
          ))}
          <span style={{ marginLeft: '12px', fontSize: '14px', color: 'var(--sb-text-body)', alignSelf: 'center' }}>
            = 32px (8 x 4px base unit)
          </span>
        </div>
      </div>

      {/* Spacing Scale */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '24px' }}>
          Spacing Scale
        </h2>
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
              gridTemplateColumns: '120px 60px 1fr',
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
              Visual
            </span>
          </div>
          <div style={{ padding: '0 24px' }}>
            {spacingTokens.map((token, i) => (
              <SpacingBar key={token.name} {...token} />
            ))}
          </div>
        </div>
      </div>

      {/* Screens */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          Screens
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5, marginBottom: '24px' }}>
          Working from a pre-defined and limited spacing system for wrapping content allows you to work
          faster and consistently. These pre-defined widths are derived from the primitive spacing values
          and are useful for defining max widths for sections such as text content and page headings.
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
              gridTemplateColumns: '180px 80px 1fr',
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
              Visual
            </span>
          </div>
          <div style={{ padding: '0 24px' }}>
            {screenTokens.map((token) => (
              <div
                key={token.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 80px 1fr',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--sb-border-default)',
                }}
              >
                <code style={{ fontSize: '14px', fontWeight: 500 }}>{token.name}</code>
                <span style={{ fontSize: '14px', color: 'var(--sb-text-body)' }}>{token.value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: `${token.pixels}px`,
                      height: '24px',
                      backgroundColor: 'var(--color-brand-500)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paragraph (Line Widths) */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          Paragraph (Line Widths)
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--sb-text-body)', maxWidth: '720px', lineHeight: 1.5, marginBottom: '24px' }}>
          Similar to the container variables above, paragraph text such as blog post content have a
          max-width defined as a separate variable. This ensures all paragraph line lengths are optimized
          for readability and also allows you to change this max width across your designs in a few clicks.
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
              gridTemplateColumns: '180px 80px 1fr',
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
              Visual
            </span>
          </div>
          <div style={{ padding: '0 24px' }}>
            {paragraphTokens.map((token) => (
              <div
                key={token.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 80px 1fr',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--sb-border-default)',
                }}
              >
                <code style={{ fontSize: '14px', fontWeight: 500 }}>{token.name}</code>
                <span style={{ fontSize: '14px', color: 'var(--sb-text-body)' }}>{token.value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: `${token.pixels}px`,
                      height: '24px',
                      backgroundColor: 'var(--color-brand-500)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--sb-text-heading)', marginBottom: '16px' }}>
          Usage
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--sb-text-secondary)', marginBottom: '16px' }}>
          Spacing tokens are available as Tailwind classes. Note that our spacing scale uses pixel values directly, not the default Tailwind 4x multiplier:
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
          <code>{`// Padding
<div className="p-8" />       // 8px padding all sides
<div className="px-16" />     // 16px horizontal padding
<div className="py-12" />     // 12px vertical padding

// Margin
<div className="m-24" />      // 24px margin all sides
<div className="mt-32" />     // 32px top margin
<div className="mb-16" />     // 16px bottom margin

// Gap (Flexbox/Grid)
<div className="gap-8" />     // 8px gap
<div className="gap-x-16" />  // 16px horizontal gap
<div className="gap-y-12" />  // 12px vertical gap

// Space between
<div className="space-x-8" /> // 8px horizontal space
<div className="space-y-16" /> // 16px vertical space`}</code>
        </pre>
      </div>
    </div>
  ),
}
