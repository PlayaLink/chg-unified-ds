/**
 * TextInput component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=21-188
 */
'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    wrapper: 'relative flex items-center',
    input: [
      'w-full font-regular transition duration-100 ease-linear',
      'bg-gray-50 text-gray-900 ring-1 ring-gray-300 ring-inset',
      'placeholder:text-gray-400',
      'outline-none',
      'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
    ].join(' '),
    iconWrapper: 'pointer-events-none absolute left-12 flex items-center',
    icon: 'size-16 shrink-0 text-gray-500',
    prefixWrapper: 'pointer-events-none absolute left-12 flex items-center',
    prefix: 'text-gray-500',
  },
  sizes: {
    default: {
      input: 'h-[40px] rounded-4 text-md',
      inputWithIcon: 'pl-[36px] pr-12',
      inputWithPrefix: 'pl-[36px] pr-12',
      inputPlain: 'px-12',
    },
    compact: {
      input: 'h-[32px] rounded-4 text-sm',
      inputWithIcon: 'pl-[32px] pr-12',
      inputWithPrefix: 'pl-[32px] pr-12',
      inputPlain: 'px-12',
    },
  },
  states: {
    default: { input: 'focus:ring-4 focus:ring-brand-100' },
    error: { input: 'ring-error-300 focus:ring-4 focus:ring-error-100' },
  },
  variants: {
    text: {},
    search: {},
    url: { prefix: 'https://' },
    action: {},
    time: {},
    currency: { prefix: '$' },
  },
})

export type TextInputVariant = keyof typeof styles.variants
export type TextInputSize = keyof typeof styles.sizes
export type TextInputState = keyof typeof styles.states

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  /** Input variant */
  variant?: TextInputVariant
  /** Size variant */
  size?: TextInputSize
  /** Visual state */
  state?: TextInputState
  /** Optional leading icon */
  icon?: ReactNode
  /** Additional className for wrapper */
  className?: string
  /** Additional className for input */
  inputClassName?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      variant = 'text',
      size = 'default',
      state = 'default',
      icon,
      className,
      inputClassName,
      disabled,
      ...props
    },
    ref,
  ) {
    const variantConfig = styles.variants[variant]
    const hasPrefix = 'prefix' in variantConfig && variantConfig.prefix
    const hasIcon = Boolean(icon)

    // Determine input type based on variant
    const inputType = variant === 'search' ? 'search' : variant === 'url' ? 'url' : 'text'

    return (
      <div className={cx(styles.common.wrapper, className)}>
        {/* Leading icon */}
        {hasIcon && (
          <span className={styles.common.iconWrapper}>
            <span className={styles.common.icon}>{icon}</span>
          </span>
        )}

        {/* URL/Currency prefix */}
        {hasPrefix && !hasIcon && (
          <span className={styles.common.prefixWrapper}>
            <span className={styles.common.prefix}>{variantConfig.prefix}</span>
          </span>
        )}

        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          className={cx(
            styles.common.input,
            styles.sizes[size].input,
            hasIcon
              ? styles.sizes[size].inputWithIcon
              : hasPrefix
                ? styles.sizes[size].inputWithPrefix
                : styles.sizes[size].inputPlain,
            styles.states[state].input,
            inputClassName,
          )}
          {...props}
        />
      </div>
    )
  },
)
