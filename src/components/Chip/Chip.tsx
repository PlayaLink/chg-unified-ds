/**
 * Chip component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=722-9956
 * @storybook https://www.chg-unified-design.com/?path=/story/components-chip--props
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

// X icon for dismiss button
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
)

export const styles = sortCx({
  common: {
    root: [
      'group inline-flex cursor-pointer items-center justify-center gap-4 whitespace-nowrap font-medium transition duration-100 ease-linear',
      'outline-none focus-visible:ring-4 focus-visible:ring-brand-100',
    ].join(' '),
    icon: 'pointer-events-none shrink-0',
    dismiss: 'pointer-events-none shrink-0',
  },
  sizes: {
    default: {
      root: 'px-12 py-8 text-md',
      icon: 'size-[20px]',
      dismiss: 'size-[20px]',
    },
    compact: {
      root: 'px-8 py-6 text-sm',
      icon: 'size-[16px]',
      dismiss: 'size-[16px]',
    },
  },
  variants: {
    unselected: {
      root: [
        'bg-base-white text-gray-900 ring-1 ring-gray-300 ring-inset',
        'hover:bg-gray-50',
      ].join(' '),
    },
    selected: {
      root: [
        'bg-brand-50 text-gray-900 ring-1 ring-brand-600 ring-inset',
        'hover:bg-brand-100',
      ].join(' '),
    },
  },
  rounded: {
    false: { root: 'rounded-4' },
    true: { root: 'rounded-9999' },
  },
})

export type ChipSize = keyof typeof styles.sizes
export type ChipVariant = keyof typeof styles.variants

export interface ChipProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  /** The size of the chip */
  size?: ChipSize
  /** Whether the chip is selected */
  isSelected?: boolean
  /** Whether the chip has rounded (pill) shape */
  isRounded?: boolean
  /** Whether the chip can be dismissed */
  isDismissible?: boolean
  /** Icon component or element to show before the text */
  icon?: FC<{ className?: string }> | ReactNode
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void
  /** Additional className */
  className?: string
  /** Chip content */
  children?: ReactNode
}

export function Chip({
  size = 'default',
  isSelected = false,
  isRounded = false,
  isDismissible = false,
  icon: Icon,
  onDismiss,
  children,
  className,
  ...props
}: ChipProps) {
  const variant = isSelected ? 'selected' : 'unselected'
  const iconClassName = cx(styles.common.icon, styles.sizes[size].icon)
  const dismissClassName = cx(styles.common.dismiss, styles.sizes[size].dismiss)

  const rootClassName = cx(
    styles.common.root,
    styles.sizes[size].root,
    styles.variants[variant].root,
    styles.rounded[isRounded ? 'true' : 'false'].root,
    className,
  )

  return (
    <AriaButton
      className={rootClassName}
      {...props}
    >
      {isValidElement(Icon) && Icon}
      {isReactComponent(Icon) && <Icon className={iconClassName} />}

      {children && <span>{children}</span>}

      {isDismissible && (
        <span
          role="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            onDismiss?.()
          }}
          className="pointer-events-auto cursor-pointer"
        >
          <XIcon className={dismissClassName} />
        </span>
      )}
    </AriaButton>
  )
}
