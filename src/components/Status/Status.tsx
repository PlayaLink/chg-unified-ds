/**
 * Status component - badge with dot indicator and label
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=326-10060
 * @storybook https://www.chg-unified-design.com/?path=/story/components-status--props
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { DotStatus, type DotStatusAppearance } from '../DotStatus'

export const styles = sortCx({
  common: {
    root: 'inline-flex items-center ring-1 ring-gray-300 ring-inset',
    label: 'px-4 text-xs font-medium text-gray-900',
  },
  solid: {
    true: { root: 'bg-gray-100' },
    false: { root: 'bg-base-white' },
  },
  rounded: {
    true: { root: 'rounded-9999' },
    false: { root: 'rounded-4' },
  },
  size: {
    compact: {
      rounded: { root: 'px-8 py-2' },
      square: { root: 'px-6 py-2' },
    },
    default: {
      rounded: { root: 'px-10 py-4' },
      square: { root: 'px-8 py-4' },
    },
  },
})

export type StatusSize = keyof typeof styles.size

export interface StatusProps {
  /** Filled background vs white background */
  isSolid?: boolean
  /** Pill shape vs square corners */
  isRounded?: boolean
  /** Size variant */
  size?: StatusSize
  /** Color appearance for the dot indicator */
  appearance?: DotStatusAppearance
  /** Label text */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function Status({
  isSolid = false,
  isRounded = true,
  size = 'default',
  appearance = 'sky',
  children,
  className,
}: StatusProps) {
  const sizeStyles = isRounded
    ? styles.size[size].rounded.root
    : styles.size[size].square.root

  return (
    <span
      className={cx(
        styles.common.root,
        styles.solid[isSolid ? 'true' : 'false'].root,
        styles.rounded[isRounded ? 'true' : 'false'].root,
        sizeStyles,
        className,
      )}
    >
      <DotStatus appearance={appearance} size="compact" />
      <span className={styles.common.label}>{children}</span>
    </span>
  )
}
