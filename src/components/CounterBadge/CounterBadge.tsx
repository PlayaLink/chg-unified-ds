/**
 * CounterBadge component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=708-1015
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'inline-flex items-center justify-center p-2 text-xs font-semibold',
    label: 'px-4',
  },
  rounded: {
    true: { root: 'rounded-9999' },
    false: { root: 'rounded-4' },
  },
  colors: {
    neutral: {
      solid: { root: 'bg-gray-300 text-gray-900' },
      outline: { root: 'text-gray-800 ring-1 ring-gray-300 ring-inset' },
    },
    red: {
      solid: { root: 'bg-red-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-red-600 ring-inset' },
    },
    orange: {
      solid: { root: 'bg-orange-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-orange-600 ring-inset' },
    },
    yellow: {
      solid: { root: 'bg-yellow-300 text-gray-800' },
      outline: { root: 'text-gray-800 ring-1 ring-yellow-300 ring-inset' },
    },
    lime: {
      solid: { root: 'bg-lime-400 text-gray-800' },
      outline: { root: 'text-gray-800 ring-1 ring-lime-400 ring-inset' },
    },
    green: {
      solid: { root: 'bg-green-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-green-600 ring-inset' },
    },
    sky: {
      solid: { root: 'bg-sky-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-sky-600 ring-inset' },
    },
    cyan: {
      solid: { root: 'bg-cyan-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-cyan-600 ring-inset' },
    },
    blue: {
      solid: { root: 'bg-blue-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-blue-600 ring-inset' },
    },
    indigo: {
      solid: { root: 'bg-indigo-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-indigo-600 ring-inset' },
    },
    purple: {
      solid: { root: 'bg-purple-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-purple-600 ring-inset' },
    },
    magenta: {
      solid: { root: 'bg-magenta-600 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-magenta-600 ring-inset' },
    },
    rose: {
      solid: { root: 'bg-rose-700 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-rose-600 ring-inset' },
    },
    inverse: {
      solid: { root: 'bg-gray-900 text-base-white' },
      outline: { root: 'text-gray-800 ring-1 ring-gray-300 ring-inset' },
    },
  },
})

export type CounterBadgeColor = keyof typeof styles.colors

export interface CounterBadgeProps {
  /** Color variant */
  color?: CounterBadgeColor
  /** Filled background vs outline */
  isSolid?: boolean
  /** Pill shape vs square corners */
  isRounded?: boolean
  /** Badge content (typically a number or "99+") */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function CounterBadge({
  color = 'neutral',
  isSolid = false,
  isRounded = true,
  children,
  className,
}: CounterBadgeProps) {
  const variant = isSolid ? 'solid' : 'outline'

  return (
    <span
      className={cx(
        styles.common.root,
        styles.rounded[isRounded ? 'true' : 'false'].root,
        styles.colors[color][variant].root,
        className,
      )}
    >
      <span className={styles.common.label}>{children}</span>
    </span>
  )
}
