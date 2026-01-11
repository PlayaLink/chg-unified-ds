/**
 * ProgressBar component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=5282-681
 */
'use client'

import { cx, sortCx } from '@/utils/cx'

export type ProgressBarLabel = 'right' | 'bottom' | 'top-floating' | 'bottom-floating' | false

export const styles = sortCx({
  root: {
    base: 'w-full',
    right: 'flex items-center gap-12',
    bottom: 'flex flex-col gap-8',
    floating: 'relative',
  },
  track: {
    base: 'relative h-8 w-full overflow-hidden rounded-8 bg-gray-200',
    right: 'flex-1',
  },
  fill: 'absolute top-0 left-0 h-full rounded-8 bg-brand-600 transition-all duration-300',
  label: {
    static: 'text-sm font-medium text-gray-700',
    floating: [
      'absolute -translate-x-1/2 whitespace-nowrap rounded-8 bg-gray-800',
      'px-8 py-4 text-xs font-semibold text-base-white',
    ].join(' '),
  },
  floatingContainer: {
    top: 'absolute -top-32 transition-all duration-300',
    bottom: 'absolute -bottom-32 transition-all duration-300',
  },
})

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number
  /** Label position or false to hide */
  label?: ProgressBarLabel
  /** Additional className */
  className?: string
}

export function ProgressBar({
  value,
  label = false,
  className,
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value))
  const percentage = `${Math.round(clampedValue)}%`

  const isFloating = label === 'top-floating' || label === 'bottom-floating'
  const isRight = label === 'right'
  const isBottom = label === 'bottom'

  const rootClassName = cx(
    styles.root.base,
    isRight && styles.root.right,
    isBottom && styles.root.bottom,
    isFloating && styles.root.floating,
    className,
  )

  const renderLabel = () => {
    if (!label) return null

    if (isFloating) {
      return (
        <div
          className={cx(
            label === 'top-floating' ? styles.floatingContainer.top : styles.floatingContainer.bottom,
          )}
          style={{ left: `${clampedValue}%` }}
        >
          <span className={styles.label.floating}>{percentage}</span>
        </div>
      )
    }

    return <span className={styles.label.static}>{percentage}</span>
  }

  return (
    <div
      className={rootClassName}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${percentage}`}
    >
      {label === 'top-floating' && renderLabel()}
      <div className={cx(styles.track.base, isRight && styles.track.right)}>
        <div
          className={styles.fill}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {(isRight || isBottom || label === 'bottom-floating') && renderLabel()}
    </div>
  )
}
