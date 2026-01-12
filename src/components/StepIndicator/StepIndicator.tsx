/**
 * StepIndicator component - multi-step progress indicator
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4415-16250
 * @storybook https://www.chg-unified-design.com/?path=/story/components-stepindicator--props
 */
'use client'

import {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from 'react'
import { cx, sortCx } from '@/utils/cx'

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  root: {
    horizontal: 'flex flex-row items-start',
    vertical: 'flex flex-col',
  },
  item: {
    common: 'flex',
    horizontal: 'flex-col items-center flex-1',
    vertical: 'flex-row items-stretch',
  },
  progress: {
    common: 'flex items-center',
    horizontal: 'w-full',
    vertical: 'flex-col h-full',
  },
  line: {
    horizontal: 'h-2 flex-1',
    vertical: 'w-2 flex-1 min-h-24',
  },
  lineColor: {
    complete: 'bg-success-600',
    active: 'bg-gray-200',
    incomplete: 'bg-gray-200',
    disabled: 'bg-gray-200',
    error: 'bg-gray-200',
  },
  indicator: {
    common: 'flex items-center justify-center rounded-9999 shrink-0',
    default: 'size-32',
    compact: 'size-24',
  },
  indicatorStatus: {
    complete: 'bg-success-600 text-base-white',
    active: 'bg-primary-600 text-base-white',
    incomplete: 'bg-base-white text-gray-500 ring-2 ring-gray-300 ring-inset',
    disabled: 'bg-gray-100 text-gray-400',
    error: 'bg-error-600 text-base-white',
  },
  labelContainer: {
    horizontal: 'flex flex-col items-center mt-8 text-center',
    vertical: 'flex flex-col ml-12',
  },
  label: {
    common: 'text-base font-medium',
    complete: 'text-gray-900',
    active: 'text-gray-900',
    incomplete: 'text-gray-500',
    disabled: 'text-gray-400',
    error: 'text-error-600',
  },
  description: {
    common: 'text-xs',
    complete: 'text-gray-500',
    active: 'text-gray-500',
    incomplete: 'text-gray-400',
    disabled: 'text-gray-300',
    error: 'text-gray-500',
  },
})

// =============================================================================
// TYPES
// =============================================================================

export type StepStatus = 'complete' | 'active' | 'incomplete' | 'disabled' | 'error'
export type StepSize = 'default' | 'compact'
export type StepOrientation = 'horizontal' | 'vertical'
type StepPosition = 'start' | 'middle' | 'end' | 'only'

// =============================================================================
// CONTEXT
// =============================================================================

interface StepIndicatorContextValue {
  orientation: StepOrientation
  size: StepSize
  showLabels: boolean
  totalItems: number
}

const StepIndicatorContext = createContext<StepIndicatorContextValue | null>(null)

function useStepIndicatorContext() {
  const context = useContext(StepIndicatorContext)
  if (!context) {
    throw new Error('StepIndicator.Item must be used within a StepIndicator')
  }
  return context
}

// =============================================================================
// ICONS
// =============================================================================

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path
        d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
      />
    </svg>
  )
}

// =============================================================================
// STEP INDICATOR ITEM
// =============================================================================

export interface StepIndicatorItemProps {
  /** Status of this step */
  status?: StepStatus
  /** Main label text */
  label?: ReactNode
  /** Optional description text */
  description?: ReactNode
  /** Custom content below the label */
  children?: ReactNode
  /** Additional className */
  className?: string
  /** @internal Index assigned by parent */
  _index?: number
}

function StepIndicatorItem({
  status = 'incomplete',
  label,
  description,
  children,
  className,
  _index = 0,
}: StepIndicatorItemProps) {
  const { orientation, size, showLabels, totalItems } =
    useStepIndicatorContext()

  const index = _index
  const position: StepPosition =
    totalItems === 1 ? 'only' :
    index === 0 ? 'start' :
    index === totalItems - 1 ? 'end' : 'middle'

  const showLeftLine = position === 'middle' || position === 'end'
  const showRightLine = position === 'middle' || position === 'start'

  // Determine line colors based on status
  // Lines are green for complete steps and up to the active/error step
  const isProgressReached = status === 'complete' || status === 'active' || status === 'error'
  const leftLineColor = isProgressReached ? 'complete' : 'incomplete'
  const rightLineColor = status === 'complete' ? 'complete' : 'incomplete'

  const renderIndicator = () => {
    const iconSize = size === 'compact' ? 'size-12' : 'size-16'

    if (status === 'complete') {
      return <CheckIcon className={iconSize} />
    }
    if (status === 'error') {
      return <XIcon className={iconSize} />
    }
    // Active, incomplete, disabled show step number or dot
    return (
      <span className={cx('text-xs font-semibold', size === 'compact' && 'text-[10px]')}>
        {index + 1}
      </span>
    )
  }

  // Vertical layout: indicator column on left, labels on right
  if (orientation === 'vertical') {
    return (
      <div className={cx(styles.item.common, styles.item.vertical, className)}>
        {/* Left column: indicator at top, line below */}
        <div className="flex flex-col items-center">
          {/* Indicator */}
          <div
            className={cx(
              styles.indicator.common,
              styles.indicator[size],
              styles.indicatorStatus[status],
            )}
          >
            {renderIndicator()}
          </div>

          {/* Line below indicator */}
          {showRightLine ? (
            <div className={cx(styles.line.vertical, 'flex-1', styles.lineColor[rightLineColor])} />
          ) : null}
        </div>

        {/* Right column: labels aligned with indicator top */}
        {showLabels && (label || description || children) && (
          <div className={cx(styles.labelContainer.vertical)}>
            {label && (
              <span className={cx(styles.label.common, styles.label[status])}>
                {label}
              </span>
            )}
            {description && (
              <span className={cx(styles.description.common, styles.description[status])}>
                {description}
              </span>
            )}
            {children}
          </div>
        )}
      </div>
    )
  }

  // Horizontal layout
  return (
    <div
      className={cx(
        styles.item.common,
        styles.item.horizontal,
        className,
      )}
    >
      {/* Progress track with lines and indicator */}
      <div className={cx(styles.progress.common, styles.progress.horizontal)}>
        {/* Left line */}
        {showLeftLine ? (
          <div
            className={cx(
              styles.line.horizontal,
              styles.lineColor[leftLineColor],
            )}
          />
        ) : (
          <div className={cx(styles.line.horizontal, 'bg-transparent')} />
        )}

        {/* Status indicator */}
        <div
          className={cx(
            styles.indicator.common,
            styles.indicator[size],
            styles.indicatorStatus[status],
          )}
        >
          {renderIndicator()}
        </div>

        {/* Right line */}
        {showRightLine ? (
          <div
            className={cx(
              styles.line.horizontal,
              styles.lineColor[rightLineColor],
            )}
          />
        ) : (
          <div className={cx(styles.line.horizontal, 'bg-transparent')} />
        )}
      </div>

      {/* Label container */}
      {showLabels && (label || description || children) && (
        <div className={styles.labelContainer.horizontal}>
          {label && (
            <span className={cx(styles.label.common, styles.label[status])}>
              {label}
            </span>
          )}
          {description && (
            <span className={cx(styles.description.common, styles.description[status])}>
              {description}
            </span>
          )}
          {children}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// STEP INDICATOR ROOT
// =============================================================================

export interface StepIndicatorProps {
  /** Layout orientation */
  orientation?: StepOrientation
  /** Size variant */
  size?: StepSize
  /** Whether to show labels */
  showLabels?: boolean
  /** Step items */
  children?: ReactNode
  /** Additional className */
  className?: string
}

function StepIndicatorRoot({
  orientation = 'horizontal',
  size = 'default',
  showLabels = true,
  children,
  className,
}: StepIndicatorProps) {
  const totalItems = Children.count(children)

  return (
    <StepIndicatorContext.Provider
      value={{ orientation, size, showLabels, totalItems }}
    >
      <div className={cx(styles.root[orientation], className)}>
        {Children.map(children, (child, index) => {
          if (!isValidElement<StepIndicatorItemProps>(child)) {
            return child
          }
          return cloneElement(child, { _index: index } as Partial<StepIndicatorItemProps>)
        })}
      </div>
    </StepIndicatorContext.Provider>
  )
}

// =============================================================================
// COMPOUND COMPONENT EXPORT
// =============================================================================

export const StepIndicator = Object.assign(StepIndicatorRoot, {
  Item: StepIndicatorItem,
})
