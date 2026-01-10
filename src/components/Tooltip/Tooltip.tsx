/**
 * Tooltip component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=730-22084
 */
'use client'

import type { ReactNode } from 'react'
import type { TooltipProps as AriaTooltipProps } from 'react-aria-components'
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: [
      'z-50 shadow-md',
      'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95',
      'data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95',
    ].join(' '),
    arrowWrapper: 'group',
    arrow: [
      'fill-current',
      'group-data-[placement=bottom]:rotate-180',
      'group-data-[placement=left]:-rotate-90',
      'group-data-[placement=right]:rotate-90',
    ].join(' '),
  },
  appearances: {
    plain: {
      root: 'rounded-4 bg-gray-900 px-12 py-8 text-sm text-base-white',
      arrow: 'text-gray-900',
    },
    soft: {
      root: 'rounded-4 bg-cyan-50 px-12 py-8 text-sm text-gray-900',
      arrow: 'text-cyan-50',
    },
    rich: {
      root: 'rounded-8 bg-gray-900 px-16 py-12 text-sm text-base-white',
      arrow: 'text-gray-900',
    },
    micro: {
      root: 'rounded-4 bg-gray-900 px-8 py-4 text-xs text-base-white',
      arrow: 'text-gray-900',
    },
  },
})

export type TooltipAppearance = keyof typeof styles.appearances
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps extends Omit<AriaTooltipProps, 'className' | 'children'> {
  /** Visual appearance */
  appearance?: TooltipAppearance
  /** Tooltip content */
  children: ReactNode
  /** Show arrow pointing to trigger */
  showArrow?: boolean
  /** Additional className */
  className?: string
}

export function Tooltip({
  appearance = 'plain',
  children,
  showArrow = true,
  className,
  ...props
}: TooltipProps) {
  return (
    <AriaTooltip
      offset={showArrow ? 10 : 6}
      className={cx(
        styles.common.root,
        styles.appearances[appearance].root,
        className,
      )}
      {...props}
    >
      {showArrow && (
        <OverlayArrow className={styles.common.arrowWrapper}>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={cx(styles.common.arrow, styles.appearances[appearance].arrow)}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaTooltip>
  )
}

export interface TooltipTriggerProps {
  /** The trigger element (must accept ref) */
  children: ReactNode
  /** Tooltip content */
  tooltip: ReactNode
  /** Tooltip appearance */
  appearance?: TooltipAppearance
  /** Preferred placement */
  placement?: TooltipPlacement
  /** Show arrow pointing to trigger */
  showArrow?: boolean
  /** Delay before showing (ms) */
  delay?: number
  /** Additional className for tooltip */
  className?: string
}

export function TooltipTrigger({
  children,
  tooltip,
  appearance = 'plain',
  placement = 'top',
  showArrow = true,
  delay = 500,
  className,
}: TooltipTriggerProps) {
  return (
    <AriaTooltipTrigger delay={delay}>
      {children}
      <Tooltip
        appearance={appearance}
        placement={placement}
        showArrow={showArrow}
        className={className}
      >
        {tooltip}
      </Tooltip>
    </AriaTooltipTrigger>
  )
}
