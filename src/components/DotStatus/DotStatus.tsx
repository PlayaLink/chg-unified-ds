/**
 * DotStatus component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=450-6210
 */
'use client'

import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'inline-block shrink-0 rounded-9999',
  },
  sizes: {
    compact: { root: 'size-8' },
    default: { root: 'size-12' },
  },
  appearances: {
    neutral: { root: 'bg-gray-200' },
    red: { root: 'bg-error-600' },
    orange: { root: 'bg-warning-500' },
    yellow: { root: 'bg-yellow-300' },
    celery: { root: 'bg-lime-400' },
    green: { root: 'bg-success-600' },
    sky: { root: 'bg-sky-600' },
    cyan: { root: 'bg-cyan-600' },
    blue: { root: 'bg-blue-700' },
    indigo: { root: 'bg-indigo-600' },
    purple: { root: 'bg-purple-700' },
    fuchsia: { root: 'bg-fuchsia-600' },
    magenta: { root: 'bg-rose-600' },
    inverse: { root: 'bg-gray-800' },
  },
  border: {
    true: { root: 'ring-2 ring-gray-200' },
    false: { root: '' },
  },
})

export type DotStatusSize = keyof typeof styles.sizes
export type DotStatusAppearance = keyof typeof styles.appearances

export interface DotStatusProps {
  /** The color appearance of the dot */
  appearance?: DotStatusAppearance
  /** The size of the dot */
  size?: DotStatusSize
  /** Whether to show a border around the dot */
  border?: boolean
  /** Additional className */
  className?: string
}

export function DotStatus({
  appearance = 'neutral',
  size = 'default',
  border = false,
  className,
}: DotStatusProps) {
  return (
    <span
      className={cx(
        styles.common.root,
        styles.sizes[size].root,
        styles.appearances[appearance].root,
        styles.border[border ? 'true' : 'false'].root,
        className,
      )}
      role="status"
      aria-label={`${appearance} status`}
    />
  )
}
