/**
 * Dropdown component (trigger only)
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=23-944
 * @storybook https://www.chg-unified-design.com/?path=/story/components-dropdown--props
 */
'use client'

import type { ReactNode } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

// Caret down icon
const CaretDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

export const styles = sortCx({
  common: {
    root: [
      'group inline-flex w-full cursor-pointer items-center justify-between font-regular transition duration-100 ease-linear',
      'bg-gray-50 text-gray-900 ring-1 ring-gray-300 ring-inset',
      'outline-none',
      'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
    ].join(' '),
    icon: 'pointer-events-none shrink-0 text-gray-500',
  },
  sizes: {
    default: {
      root: 'gap-4 rounded-4 px-16 py-10 text-md',
      icon: 'size-[20px]',
    },
    condensed: {
      root: 'gap-4 rounded-4 px-14 py-8 text-sm',
      icon: 'size-[20px]',
    },
  },
  states: {
    default: {
      root: 'focus:ring-4 focus:ring-brand-100',
    },
    error: {
      root: [
        'text-error-600 ring-error-300',
        'focus:ring-4 focus:ring-error-100',
      ].join(' '),
    },
  },
})

export type DropdownSize = keyof typeof styles.sizes
export type DropdownState = keyof typeof styles.states

export interface DropdownProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  /** The size of the dropdown */
  size?: DropdownSize
  /** Visual state of the dropdown */
  state?: DropdownState
  /** Placeholder or selected value text */
  placeholder?: string
  /** Additional className */
  className?: string
  /** Dropdown content (overrides placeholder) */
  children?: ReactNode
}

export function Dropdown({
  size = 'default',
  state = 'default',
  placeholder = 'Select an option',
  children,
  className,
  isDisabled,
  ...props
}: DropdownProps) {
  const iconClassName = cx(styles.common.icon, styles.sizes[size].icon)

  const rootClassName = cx(
    styles.common.root,
    styles.sizes[size].root,
    styles.states[state].root,
    className,
  )

  return (
    <AriaButton
      className={rootClassName}
      isDisabled={isDisabled}
      {...props}
    >
      <span className="truncate">{children || placeholder}</span>
      <CaretDownIcon className={iconClassName} />
    </AriaButton>
  )
}
