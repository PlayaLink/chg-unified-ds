/**
 * ThemeDemo component - demonstrates brand colors and dark mode
 */
import { cx } from '@/utils/cx'

const colorShades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const

interface ColorSwatchProps {
  label: string
  colorVar: string
  shade: string
}

function ColorSwatch({ label, colorVar, shade }: ColorSwatchProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cx('w-16 h-16 rounded-8 border border-gray-200')}
        style={{ backgroundColor: `var(${colorVar})` }}
      />
      <span className="text-xs mt-2 text-gray-600">{shade}</span>
    </div>
  )
}

interface ColorRowProps {
  label: string
  prefix: string
}

function ColorRow({ label, prefix }: ColorRowProps) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{label}</h3>
      <div className="flex gap-2 flex-wrap">
        {colorShades.map((shade) => (
          <ColorSwatch
            key={shade}
            label={label}
            colorVar={`--color-${prefix}-${shade}`}
            shade={shade}
          />
        ))}
      </div>
    </div>
  )
}

export function ThemeDemo() {
  return (
    <div className="p-8 bg-base-white rounded-12 min-w-[600px]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Brand Color Palette</h2>
      <ColorRow label="Brand / Primary" prefix="brand" />
      <ColorRow label="Secondary" prefix="secondary" />
    </div>
  )
}
