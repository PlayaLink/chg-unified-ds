/**
 * Textarea component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=60-928
 */
'use client'

import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: [
      'w-full font-regular transition duration-100 ease-linear',
      'bg-gray-50 text-gray-900 ring-1 ring-gray-300 ring-inset',
      'placeholder:text-gray-400',
      'outline-none',
      'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
    ].join(' '),
  },
  sizes: {
    default: { root: 'rounded-4 px-12 py-10 text-md' },
    compact: { root: 'rounded-4 px-12 py-10 text-sm' },
  },
  states: {
    default: { root: 'focus:ring-4 focus:ring-brand-100' },
    error: { root: 'ring-error-300 focus:ring-4 focus:ring-error-100' },
  },
  resize: {
    true: { root: 'resize-y' },
    false: { root: 'resize-none' },
  },
})

export type TextareaSize = keyof typeof styles.sizes
export type TextareaState = keyof typeof styles.states

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  /** Size variant */
  size?: TextareaSize
  /** Visual state */
  state?: TextareaState
  /** Allow user to resize vertically */
  resize?: boolean
  /** Additional className */
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size = 'default',
      state = 'default',
      resize = true,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <textarea
        ref={ref}
        className={cx(
          styles.common.root,
          styles.sizes[size].root,
          styles.states[state].root,
          styles.resize[resize ? 'true' : 'false'].root,
          className,
        )}
        {...props}
      />
    )
  },
)
