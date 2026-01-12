/**
 * Tag component - label tag with optional icon
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=717-4274
 * @storybook https://www.chg-unified-design.com/?path=/story/components-tag--props
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  common: {
    root: 'inline-flex items-center gap-4 text-xs font-medium',
    icon: 'size-12 shrink-0',
  },
  size: {
    default: {
      rounded: { root: 'px-12 py-4' },
      square: { root: 'px-12 py-4' },
    },
    compact: {
      rounded: { root: 'px-10 py-2' },
      square: { root: 'px-8 py-2' },
    },
  },
  rounded: {
    true: { root: 'rounded-9999' },
    false: { root: 'rounded-4' },
  },
  colors: {
    neutral: {
      solid: { root: 'bg-gray-300 text-gray-900' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-gray-300 ring-inset' },
    },
    red: {
      solid: { root: 'bg-error-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-error-600 ring-inset' },
    },
    orange: {
      solid: { root: 'bg-warning-500 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-warning-500 ring-inset' },
    },
    yellow: {
      solid: { root: 'bg-yellow-300 text-gray-900' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-yellow-300 ring-inset' },
    },
    emerald: {
      solid: { root: 'bg-lime-400 text-gray-900' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-lime-400 ring-inset' },
    },
    green: {
      solid: { root: 'bg-success-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-success-600 ring-inset' },
    },
    sky: {
      solid: { root: 'bg-sky-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-sky-600 ring-inset' },
    },
    cyan: {
      solid: { root: 'bg-cyan-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-cyan-600 ring-inset' },
    },
    blue: {
      solid: { root: 'bg-blue-700 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-blue-700 ring-inset' },
    },
    indigo: {
      solid: { root: 'bg-indigo-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-indigo-600 ring-inset' },
    },
    purple: {
      solid: { root: 'bg-purple-700 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-purple-700 ring-inset' },
    },
    fuchsia: {
      solid: { root: 'bg-fuchsia-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-fuchsia-600 ring-inset' },
    },
    magenta: {
      solid: { root: 'bg-rose-600 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-rose-600 ring-inset' },
    },
    inverse: {
      solid: { root: 'bg-gray-800 text-base-white' },
      outline: { root: 'bg-base-white text-gray-900 ring-1 ring-gray-800 ring-inset' },
    },
    transparent: {
      solid: { root: 'bg-transparent text-gray-900' },
      outline: { root: 'bg-transparent text-gray-900' },
    },
  },
})

// =============================================================================
// TYPES
// =============================================================================

export type TagColor = keyof typeof styles.colors
export type TagSize = keyof typeof styles.size

export interface TagProps {
  /** Color appearance */
  color?: TagColor
  /** Size variant */
  size?: TagSize
  /** Filled background vs outline */
  isSolid?: boolean
  /** Pill shape vs square corners */
  isRounded?: boolean
  /** Optional icon to display on the left */
  icon?: ReactNode
  /** Optional icon to display on the right (e.g., close/dismiss button) */
  iconRight?: ReactNode
  /** Tag label text */
  children?: ReactNode
  /** Additional className */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Tag({
  color = 'neutral',
  size = 'default',
  isSolid = false,
  isRounded = true,
  icon,
  iconRight,
  children,
  className,
}: TagProps) {
  const variant = isSolid ? 'solid' : 'outline'
  const sizeStyles = isRounded
    ? styles.size[size].rounded.root
    : styles.size[size].square.root

  return (
    <span
      className={cx(
        styles.common.root,
        styles.rounded[isRounded ? 'true' : 'false'].root,
        styles.colors[color][variant].root,
        sizeStyles,
        className,
      )}
    >
      {icon && <span className={styles.common.icon}>{icon}</span>}
      {children}
      {iconRight && <span className={styles.common.icon}>{iconRight}</span>}
    </span>
  )
}
