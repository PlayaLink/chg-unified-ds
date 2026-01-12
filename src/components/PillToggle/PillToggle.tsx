/**
 * PillToggle component - selectable pill-shaped toggle button
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=717-4264
 * @storybook https://www.chg-unified-design.com/?path=/story/components-pilltoggle--props
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'inline-flex cursor-pointer items-center justify-between gap-10 rounded-9999 px-16 py-8 text-base font-medium transition-colors',
  },
  selected: {
    false: {
      root: 'bg-base-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50',
    },
    true: {
      root: 'bg-primary-500 text-base-white ring-1 ring-primary-600 ring-inset hover:bg-primary-600',
    },
  },
})

export interface PillToggleProps {
  /** Whether the toggle is selected */
  isSelected?: boolean
  /** Called when the toggle is clicked */
  onPress?: () => void
  /** Toggle label */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function PillToggle({
  isSelected = false,
  onPress,
  children,
  className,
}: PillToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isSelected}
      onClick={onPress}
      className={cx(
        styles.common.root,
        styles.selected[isSelected ? 'true' : 'false'].root,
        className,
      )}
    >
      {children}
    </button>
  )
}
