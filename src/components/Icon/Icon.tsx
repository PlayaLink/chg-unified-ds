/**
 * Icon component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=19-360
 * @storybook https://www.chg-unified-design.com/?path=/story/components-icon--props
 */
'use client'

import { forwardRef } from 'react'
import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react'
import {
  Copy,
  Check,
  CaretDown,
  SignOut,
  Trash,
  Plus,
  ClockCounterClockwise,
  Sliders,
} from '@phosphor-icons/react'

// Static registry - add new icons here
const icons = {
  copy: Copy,
  check: Check,
  'chevron-down': CaretDown, // Using CaretDown as chevron alternative
  'caret-down': CaretDown,
  'sign-out': SignOut,
  trash: Trash,
  plus: Plus,
  'clock-counter-clockwise': ClockCounterClockwise,
  sliders: Sliders,
} as const

export type IconName = keyof typeof icons

// Figma-defined icon sizes matching Button component
const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
} as const

export type IconSize = keyof typeof iconSizes | number

export interface IconProps extends Omit<PhosphorIconProps, 'ref' | 'size'> {
  /** Icon name from registry */
  name: IconName
  /** Icon size - use design system tokens (xs, sm, md, lg) or pixel value */
  size?: IconSize
}

// Utility to extract size from Tailwind className
function extractSizeFromClassName(className?: string | string[]): number | undefined {
  if (!className) return undefined
  
  // Handle array of classes (React can pass className as array)
  const classString = Array.isArray(className) ? className.join(' ') : className
  
  // Match design system size tokens: size-xs, size-sm, size-md, size-lg
  const tokenMatch = classString.match(/\bsize-(xs|sm|md|lg)\b/)
  if (tokenMatch) {
    const token = tokenMatch[1] as keyof typeof iconSizes
    return iconSizes[token]
  }
  
  // Match patterns: size-[18px], w-[18px], h-[18px]
  const arbitraryMatch = classString.match(/(?:size|w|h)-\[(\d+)px\]/)
  if (arbitraryMatch) {
    const size = parseInt(arbitraryMatch[1], 10)
    return size > 0 ? size : undefined
  }
  
  // Standard Tailwind sizes: w-4 = 16px, w-5 = 20px, etc.
  // Use word boundary to avoid matching partial class names
  const standardMatch = classString.match(/\b(?:size|w|h)-(\d+)\b/)
  if (standardMatch) {
    const value = parseInt(standardMatch[1], 10)
    const size = value * 4 // Tailwind default: 1 unit = 4px
    return size > 0 ? size : undefined
  }
  
  return undefined
}

// Resolve size to pixel value
function resolveSize(size?: IconSize): number | undefined {
  if (size === undefined) return undefined
  if (typeof size === 'number') return size
  return iconSizes[size]
}

/**
 * Icon component wrapping Phosphor icons.
 *
 * @example
 * // Standalone
 * <Icon name="copy" size={24} />
 *
 * // With Tailwind color
 * <Icon name="copy" className="text-red-500" />
 *
 * // In Button iconLeading
 * iconLeading={({ className }) => <Icon name="copy" className={className} />}
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  function Icon({ name, color = 'currentColor', weight = 'regular', size, className, ...props }, ref) {
    const IconComponent = icons[name]
    
    // Resolve size: explicit prop (token or number) > className extraction > default (md = 18px)
    const resolvedSize = resolveSize(size) ?? extractSizeFromClassName(className) ?? iconSizes.md
    
    return (
      <IconComponent 
        ref={ref} 
        color={color} 
        weight={weight} 
        size={resolvedSize}
        className={className}
        {...props} 
      />
    )
  },
)

/**
 * Creates a function component for use in iconLeading/iconTrailing.
 *
 * @example
 * const CopyIcon = createIcon('copy');
 * <Button iconLeading={CopyIcon}>Copy</Button>
 */
export const createIcon = (name: IconName) =>
  ({ className }: { className?: string }) => <Icon name={name} className={className} />
