/**
 * Slot component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=3585-1237
 * @storybook https://www.chg-unified-design.com/?path=/story/components-slot--props
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type SlotAppearance = 'default' | 'thin'

export const styles = sortCx({
  root: [
    'flex items-center justify-center rounded-4 px-24',
    'border border-dashed border-indigo-800 bg-indigo-50',
    'text-xs font-semibold text-indigo-800',
  ].join(' '),
  appearances: {
    default: 'py-8',
    thin: 'py-2',
  },
})

export interface SlotProps {
  /** Visual appearance */
  appearance?: SlotAppearance
  /** Slot label text */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function Slot({
  appearance = 'default',
  children = 'Instance Slot',
  className,
}: SlotProps) {
  return (
    <div className={cx(styles.root, styles.appearances[appearance], className)}>
      {children}
    </div>
  )
}
