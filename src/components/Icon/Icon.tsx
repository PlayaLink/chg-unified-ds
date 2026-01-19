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
} from '@phosphor-icons/react'

// Static registry - add new icons here
const icons = {
  copy: Copy,
  check: Check,
  'chevron-down': CaretDown, // Using CaretDown as chevron alternative
  'caret-down': CaretDown,
  'sign-out': SignOut,
  trash: Trash,
} as const

export type IconName = keyof typeof icons

export interface IconProps extends Omit<PhosphorIconProps, 'ref'> {
  /** Icon name from registry */
  name: IconName
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
  function Icon({ name, color = 'currentColor', weight = 'regular', ...props }, ref) {
    const IconComponent = icons[name]
    return <IconComponent ref={ref} color={color} weight={weight} {...props} />
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
