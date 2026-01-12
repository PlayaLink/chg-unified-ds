/**
 * Toggle component - switch toggle with optional indeterminate state
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=34-3334
 * @storybook https://www.chg-unified-design.com/?path=/story/components-toggle--props
 */
'use client'

import type { SwitchProps as AriaSwitchProps } from 'react-aria-components'
import { Switch as AriaSwitch } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  common: {
    root: 'group inline-flex cursor-pointer items-center outline-none',
    track: [
      'relative flex items-center rounded-9999 transition-colors duration-150',
      'group-focus-visible:ring-2 group-focus-visible:ring-brand-600 group-focus-visible:ring-offset-2',
      'group-disabled:cursor-not-allowed group-disabled:opacity-50',
    ].join(' '),
    knob: 'block rounded-9999 bg-base-white shadow-sm transition-transform duration-150',
  },
  size: {
    default: {
      track: 'h-[32px] w-[52px] px-[2px]',
      knob: 'h-[28px] w-[28px]',
      knobTranslate: 'translate-x-[20px]',
      indeterminateKnob: 'h-[6px] w-[20px] mx-auto',
    },
    compact: {
      track: 'h-[20px] w-[36px] px-[2px]',
      knob: 'h-[16px] w-[16px]',
      knobTranslate: 'translate-x-[16px]',
      indeterminateKnob: 'h-[4px] w-[12px] mx-auto',
    },
  },
  state: {
    inactive: { track: 'bg-gray-400' },
    active: { track: 'bg-brand-600' },
    indeterminate: { track: 'bg-brand-600 justify-center' },
  },
})

// =============================================================================
// TYPES
// =============================================================================

export type ToggleSize = keyof typeof styles.size
export type ToggleState = 'inactive' | 'active' | 'indeterminate'

export interface ToggleProps extends Omit<AriaSwitchProps, 'className' | 'children'> {
  /** Size variant */
  size?: ToggleSize
  /** Whether the toggle is in indeterminate state (overrides isSelected) */
  isIndeterminate?: boolean
  /** Additional className */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Toggle({
  size = 'default',
  isIndeterminate = false,
  isSelected,
  className,
  ...props
}: ToggleProps) {
  // Determine visual state
  const state: ToggleState = isIndeterminate
    ? 'indeterminate'
    : isSelected
      ? 'active'
      : 'inactive'

  const sizeStyles = styles.size[size]

  return (
    <AriaSwitch
      isSelected={isSelected}
      className={cx(styles.common.root, className)}
      {...props}
    >
      <span
        className={cx(
          styles.common.track,
          sizeStyles.track,
          styles.state[state].track,
        )}
      >
        {isIndeterminate ? (
          <span
            className={cx(
              'block rounded-9999 bg-base-white',
              sizeStyles.indeterminateKnob,
            )}
          />
        ) : (
          <span
            className={cx(
              styles.common.knob,
              sizeStyles.knob,
              isSelected && sizeStyles.knobTranslate,
            )}
          />
        )}
      </span>
    </AriaSwitch>
  )
}
