import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// Shared components
const TypeSpecimen = ({
  name,
  size,
  lineHeight,
  letterSpacing,
  weights,
}: {
  name: string
  size: string
  lineHeight: string
  letterSpacing?: string
  weights: { label: string; weight: number }[]
}) => (
  <div style={{ marginBottom: '48px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e6e7eb', paddingBottom: '12px', marginBottom: '24px' }}>
      <span style={{ fontSize: '16px', color: '#6b7380' }}>{name}</span>
      <span style={{ fontSize: '14px', color: '#6b7380' }}>
        font size: {size} | Line height: {lineHeight}{letterSpacing ? ` | Letter spacing: ${letterSpacing}` : ''}
      </span>
    </div>
    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      {weights.map(({ label, weight }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: size, lineHeight, fontWeight: weight, letterSpacing: letterSpacing || 'normal' }}>{name}</span>
          <span style={{ fontSize: '16px', color: '#6b7380' }}>{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const BodyTypeSpecimen = ({
  name,
  size,
  lineHeight,
  weights,
}: {
  name: string
  size: string
  lineHeight: string
  weights: { label: string; weight: number }[]
}) => (
  <div style={{ marginBottom: '32px', padding: '24px', backgroundColor: '#f9fafc', borderRadius: '8px', border: '1px solid #e6e7eb' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <span style={{ fontSize: '14px', fontWeight: 600, padding: '4px 8px', backgroundColor: '#fff', border: '1px solid #e6e7eb', borderRadius: '4px' }}>{name}</span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, padding: '4px 8px', backgroundColor: '#fff', border: '1px solid #e6e7eb', borderRadius: '4px' }}>Font Size: {size}</span>
        <span style={{ fontSize: '14px', fontWeight: 600, padding: '4px 8px', backgroundColor: '#fff', border: '1px solid #e6e7eb', borderRadius: '4px' }}>Line Height: {lineHeight}</span>
      </div>
    </div>
    <div style={{ borderTop: '1px solid #e6e7eb', paddingTop: '16px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      {weights.map(({ label, weight }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: size, lineHeight, fontWeight: weight }}>{name}</span>
          <span style={{ fontSize: '16px', color: '#6b7380' }}>{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const weights = [
  { label: 'Regular', weight: 400 },
  { label: 'Medium', weight: 500 },
  { label: 'Semibold', weight: 600 },
  { label: 'Bold', weight: 700 },
]

// Story 1: Typography Overview
export const Overview: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: '#181d27', marginBottom: '12px' }}>
          Typography
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7380', maxWidth: '720px', lineHeight: 1.5 }}>
          Typography is the foundation of clear, consistent communication, ensuring readability and
          visual hierarchy. Our scalable font sizes, weights, and line heights adapt seamlessly
          across screens and devices.
        </p>
      </div>

      {/* Typeface & Weights Section */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', gap: '64px', marginBottom: '48px' }}>
          {/* Typeface */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '48px', fontWeight: 400 }}>Inter</span>
            </div>
            <span style={{ fontSize: '128px', fontWeight: 700, lineHeight: 1 }}>Ag</span>
            <div style={{ marginTop: '24px', fontSize: '48px', fontWeight: 400, color: '#181d27', wordBreak: 'break-all' }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 !@#$%^&*()
            </div>
          </div>

          {/* Weights */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {weights.map(({ label, weight }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '60px', fontWeight: weight, display: 'block', marginBottom: '8px' }}>Aa</span>
                <span style={{ fontSize: '20px', fontWeight: 700 }}>{label}</span>
                <br />
                <span style={{ fontSize: '20px', color: '#6b7380' }}>Font weight: {weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Support */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>Language Support Check:</h2>
          <p style={{ fontSize: '20px', lineHeight: 1.5 }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            Creme brulee, facade, uber, manana, jalapeno, naive
          </p>
        </div>

        {/* Accessibility */}
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>Accessibility & Legibility Test:</h2>
          <p style={{ fontSize: '20px', lineHeight: 1.75 }}>
            Small Text (12px): Ensures readability at small sizes.
            <br />
            Large Text (24px+): Maintains clarity and letterform integrity.
            <br />
            Letter & Word Spacing Consistency: Prevents tight or loose spacing that could impact readability.
          </p>
        </div>
      </div>
    </div>
  ),
}

// Story 2: Display Fonts
export const DisplayFonts: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: '#181d27', marginBottom: '12px' }}>
          Display Fonts
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7380', maxWidth: '720px', lineHeight: 1.5 }}>
          Display Fonts are designed for large-scale use in headlines, banners, and attention-grabbing
          text. They emphasize visual impact with bold styling, unique characteristics, and strong
          readability at large sizes.
        </p>
      </div>

      {/* Display Font Scales */}
      <TypeSpecimen name="Display 128" size="128px" lineHeight="160px" letterSpacing="-2%" weights={weights} />
      <TypeSpecimen name="Display 96" size="96px" lineHeight="124px" letterSpacing="-2%" weights={weights} />
      <TypeSpecimen name="Display 72" size="72px" lineHeight="90px" letterSpacing="-2%" weights={weights} />
      <TypeSpecimen name="Display 60" size="60px" lineHeight="72px" letterSpacing="-2%" weights={weights} />
      <TypeSpecimen name="Display 48" size="48px" lineHeight="60px" letterSpacing="-2%" weights={weights} />
      <TypeSpecimen name="Display 36" size="36px" lineHeight="44px" letterSpacing="-2%" weights={weights} />
    </div>
  ),
}

// Story 3: Foundational Typography
export const FoundationalTypography: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: '#181d27', marginBottom: '12px' }}>
          Foundational Typography
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7380', maxWidth: '720px', lineHeight: 1.5 }}>
          Foundational typography styles are used for body copy, labels, and UI text. These sizes
          ensure readability and consistency across components and layouts.
        </p>
      </div>

      {/* Heading Styles */}
      <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px' }}>Heading Styles</h2>
      <BodyTypeSpecimen name="Heading 28" size="28px" lineHeight="36px" weights={weights} />
      <BodyTypeSpecimen name="Heading 24" size="24px" lineHeight="32px" weights={weights} />
      <BodyTypeSpecimen name="Heading 20" size="20px" lineHeight="28px" weights={weights} />

      {/* Body Styles */}
      <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px', marginTop: '48px' }}>Body Styles</h2>
      <BodyTypeSpecimen name="Body 20" size="20px" lineHeight="30px" weights={weights} />
      <BodyTypeSpecimen name="Body 18" size="18px" lineHeight="28px" weights={weights} />
      <BodyTypeSpecimen name="Body 16" size="16px" lineHeight="24px" weights={weights} />
      <BodyTypeSpecimen name="Body 14" size="14px" lineHeight="20px" weights={weights} />
      <BodyTypeSpecimen name="Body 12" size="12px" lineHeight="18px" weights={weights} />

      {/* Paragraph Styles */}
      <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px', marginTop: '48px' }}>Paragraph Styles</h2>
      <BodyTypeSpecimen name="Paragraph 20" size="20px" lineHeight="30px" weights={weights} />
      <BodyTypeSpecimen name="Paragraph 18" size="18px" lineHeight="28px" weights={weights} />
      <BodyTypeSpecimen name="Paragraph 16" size="16px" lineHeight="24px" weights={weights} />
      <BodyTypeSpecimen name="Paragraph 14" size="14px" lineHeight="20px" weights={weights} />
      <BodyTypeSpecimen name="Paragraph 12" size="12px" lineHeight="18px" weights={weights} />
    </div>
  ),
}

// Story 4: Type Showcase
export const TypeShowcase: Story = {
  render: () => (
    <div style={{ padding: '40px 48px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 500, color: '#181d27', marginBottom: '12px' }}>
          Type Showcase
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7380', maxWidth: '720px', lineHeight: 1.5 }}>
          See our typography system in action. This showcase demonstrates how different type styles
          work together to create clear visual hierarchy and readable content.
        </p>
      </div>

      {/* Article Example */}
      <div style={{ maxWidth: '800px', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px' }}>Article Layout</h2>
        <div style={{ padding: '48px', backgroundColor: '#f9fafc', borderRadius: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7380', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Featured Article</span>
          <h3 style={{ fontSize: '48px', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '24px' }}>
            The Future of Design Systems
          </h3>
          <p style={{ fontSize: '20px', color: '#6b7380', lineHeight: 1.5, marginBottom: '32px' }}>
            How modern teams are building scalable, consistent user experiences through systematic design approaches.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '24px' }}>
            Design systems have evolved from simple style guides into comprehensive ecosystems that power digital products at scale. By establishing clear typography hierarchies, teams can communicate more effectively with their users.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.75 }}>
            The key to successful typography lies in understanding how different sizes, weights, and styles work together. A well-crafted type system creates rhythm and flow, guiding readers through content naturally.
          </p>
        </div>
      </div>

      {/* UI Example */}
      <div style={{ maxWidth: '800px', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px' }}>UI Components</h2>
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Card 1 */}
          <div style={{ flex: 1, padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e6e7eb' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Card Title</h4>
            <p style={{ fontSize: '14px', color: '#6b7380', lineHeight: 1.5, marginBottom: '16px' }}>
              This is a description that demonstrates body text styling within a card component.
            </p>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-brand-600)' }}>Learn more</span>
          </div>
          {/* Card 2 */}
          <div style={{ flex: 1, padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e6e7eb' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Another Card</h4>
            <p style={{ fontSize: '14px', color: '#6b7380', lineHeight: 1.5, marginBottom: '16px' }}>
              Consistent typography creates cohesive interfaces that users can navigate intuitively.
            </p>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-brand-600)' }}>View details</span>
          </div>
        </div>
      </div>

      {/* Data Table Example */}
      <div style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px' }}>Data Display</h2>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e6e7eb', overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '12px 24px', backgroundColor: '#f9fafc', borderBottom: '1px solid #e6e7eb' }}>
            <span style={{ flex: 1, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#6b7380' }}>Name</span>
            <span style={{ flex: 1, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#6b7380' }}>Role</span>
            <span style={{ flex: 1, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#6b7380' }}>Status</span>
          </div>
          {[
            { name: 'Sarah Johnson', role: 'Designer', status: 'Active' },
            { name: 'Michael Chen', role: 'Developer', status: 'Active' },
            { name: 'Emily Davis', role: 'Product Manager', status: 'Away' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', padding: '16px 24px', borderBottom: i < 2 ? '1px solid #e6e7eb' : 'none' }}>
              <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>{row.name}</span>
              <span style={{ flex: 1, fontSize: '14px', color: '#6b7380' }}>{row.role}</span>
              <span style={{ flex: 1, fontSize: '14px', color: row.status === 'Active' ? '#17a34a' : '#6b7380' }}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
