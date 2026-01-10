/**
 * Field component - form field wrapper with label, helper text, and character counter
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4501-15801
 */
'use client'

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'flex',
    head: 'flex',
    labelWrapper: 'flex flex-row items-center gap-2',
    label: 'text-sm font-normal text-gray-900',
    requiredIndicator: 'text-sm font-normal text-red-600',
    body: 'flex flex-col',
    infoWrapper: 'flex flex-row items-center justify-end gap-2',
    infoText: 'text-sm font-normal text-gray-500',
    infoIcon: 'size-20 text-gray-500',
    foot: 'flex flex-row gap-8',
    helperText: 'text-xs font-normal text-gray-500',
    counter: 'text-xs font-normal text-gray-500',
  },
  orientation: {
    vertical: {
      root: 'flex-col gap-4',
      head: 'flex-row items-stretch justify-stretch',
      labelWrapper: 'pb-4',
      body: 'gap-10',
      foot: 'justify-between',
    },
    horizontal: {
      root: 'flex-row',
      head: 'flex-row items-stretch justify-stretch w-140 py-10',
      labelWrapper: '',
      body: 'flex-1 gap-4 items-end justify-center',
      foot: 'justify-end',
    },
  },
})

export type FieldOrientation = keyof typeof styles.orientation

export interface FieldProps {
  /** Layout orientation */
  orientation?: FieldOrientation
  /** Label text for the field */
  label?: ReactNode
  /** Shows required indicator (*) */
  isRequired?: boolean
  /** Info text displayed in horizontal layout */
  infoText?: ReactNode
  /** Shows info icon next to info text */
  showInfoIcon?: boolean
  /** Helper text displayed below the input */
  helperText?: ReactNode
  /** Current character count */
  currentCount?: number
  /** Maximum character count */
  maxCount?: number
  /** Shows character counter (e.g., "12/100") */
  showCounter?: boolean
  /** The form input element */
  children?: ReactNode
  /** Additional className for root element */
  className?: string
}

// Info icon SVG component
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function Field({
  orientation = 'vertical',
  label,
  isRequired = false,
  infoText,
  showInfoIcon = false,
  helperText,
  currentCount,
  maxCount,
  showCounter = false,
  children,
  className,
}: FieldProps) {
  const hasInfo = infoText || showInfoIcon
  const hasFooter = helperText || showCounter

  return (
    <div
      className={cx(
        styles.common.root,
        styles.orientation[orientation].root,
        className,
      )}
    >
      {/* Head - Label */}
      <div
        className={cx(
          styles.common.head,
          styles.orientation[orientation].head,
        )}
      >
        <div
          className={cx(
            styles.common.labelWrapper,
            styles.orientation[orientation].labelWrapper,
          )}
        >
          {label && <span className={styles.common.label}>{label}</span>}
          {isRequired && (
            <span className={styles.common.requiredIndicator}>*</span>
          )}
        </div>
      </div>

      {/* Body - Input slot + Info + Footer */}
      <div
        className={cx(
          styles.common.body,
          styles.orientation[orientation].body,
        )}
      >
        {/* Info row (horizontal layout) */}
        {hasInfo && orientation === 'horizontal' && (
          <div className={styles.common.infoWrapper}>
            {infoText && (
              <span className={styles.common.infoText}>{infoText}</span>
            )}
            {showInfoIcon && <InfoIcon className={styles.common.infoIcon} />}
          </div>
        )}

        {/* Slot for input */}
        {children}

        {/* Footer - Helper text and Counter */}
        {hasFooter && (
          <div
            className={cx(
              styles.common.foot,
              styles.orientation[orientation].foot,
            )}
          >
            {helperText && (
              <span className={styles.common.helperText}>{helperText}</span>
            )}
            {showCounter && (
              <span className={styles.common.counter}>
                {currentCount ?? 0}/{maxCount ?? 0}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
