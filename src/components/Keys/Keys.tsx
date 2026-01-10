/**
 * Keys component - keyboard key indicator for shortcuts
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4421-8719
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'inline-flex items-center justify-center rounded-2 text-sm font-semibold',
  },
  appearance: {
    light: {
      root: 'bg-base-white text-gray-500 ring-1 ring-gray-300 ring-inset',
    },
    dark: {
      root: 'bg-gray-900 text-base-white',
    },
  },
  type: {
    flex: {
      root: 'px-8 py-2',
    },
    fixed: {
      root: 'size-24',
    },
  },
})

export type KeysAppearance = keyof typeof styles.appearance
export type KeysType = keyof typeof styles.type

export interface KeysProps {
  /** Visual appearance */
  appearance?: KeysAppearance
  /** Sizing type - flex hugs content, fixed is 24×24 */
  type?: KeysType
  /** Key label (e.g., "Esc", "⌘", "K") */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function Keys({
  appearance = 'light',
  type = 'flex',
  children,
  className,
}: KeysProps) {
  return (
    <kbd
      className={cx(
        styles.common.root,
        styles.appearance[appearance].root,
        styles.type[type].root,
        className,
      )}
    >
      {children}
    </kbd>
  )
}
