/**
 * Button component
 * @figma https://www.figma.com/design/LkIyThUA0oVNsDEAyOF7ER/Design-System--Components?node-id=19-360
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton, Link as AriaLink } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export const styles = sortCx({
  common: {
    root: [
      'group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-semibold transition duration-100 ease-linear',
      'outline-none focus-visible:ring-4 focus-visible:ring-brand-100',
      'disabled:cursor-not-allowed',
    ].join(' '),
    icon: 'pointer-events-none shrink-0',
  },
  sizes: {
    xs: {
      root: 'gap-4 rounded-6 px-8 py-4 text-xs',
      icon: 'size-[14px]',
    },
    sm: {
      root: 'gap-6 rounded-8 px-12 py-8 text-sm',
      icon: 'size-[16px]',
    },
    md: {
      root: 'gap-8 rounded-8 px-14 py-10 text-sm',
      icon: 'size-[18px]',
    },
    lg: {
      root: 'gap-8 rounded-8 px-18 py-12 text-md',
      icon: 'size-[20px]',
    },
  },
  variants: {
    primary: {
      root: [
        'bg-brand-600 text-base-white shadow-sm',
        'hover:bg-brand-700',
        'disabled:bg-gray-100 disabled:text-gray-400',
      ].join(' '),
    },
    soft: {
      root: [
        'bg-brand-100 text-brand-700',
        'hover:bg-brand-200',
        'disabled:bg-gray-100 disabled:text-gray-400',
      ].join(' '),
    },
    outline: {
      root: [
        'bg-base-white text-brand-600 ring-1 ring-brand-600 ring-inset',
        'hover:bg-brand-50',
        'disabled:text-gray-400 disabled:ring-gray-200',
      ].join(' '),
    },
    text: {
      root: [
        'text-brand-600',
        'hover:text-brand-700',
        'disabled:text-gray-400',
        '[&>[data-text]]:underline [&>[data-text]]:decoration-transparent [&>[data-text]]:underline-offset-2 hover:[&>[data-text]]:decoration-current',
      ].join(' '),
    },
    ghost: {
      root: [
        'text-gray-700',
        'hover:bg-gray-100',
        'disabled:text-gray-400',
      ].join(' '),
    },
    destructive: {
      root: [
        'bg-error-600 text-base-white shadow-sm',
        'hover:bg-error-700',
        'disabled:bg-gray-100 disabled:text-gray-400',
      ].join(' '),
    },
  },
})

export type ButtonSize = keyof typeof styles.sizes
export type ButtonVariant = keyof typeof styles.variants

export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  /** The size of the button */
  size?: ButtonSize
  /** The visual variant of the button */
  variant?: ButtonVariant
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Icon component or element to show after the text */
  iconTrailing?: FC<{ className?: string }> | ReactNode
  /** Additional className */
  className?: string
  /** href makes the button render as a link */
  href?: string
  /** Button content */
  children?: ReactNode
}

export function Button({
  size = 'md',
  variant = 'primary',
  children,
  className,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  isDisabled,
  href,
  ...props
}: ButtonProps) {
  const isIconOnly = (IconLeading || IconTrailing) && !children
  const iconClassName = cx(styles.common.icon, styles.sizes[size].icon)

  const sharedClassName = cx(
    styles.common.root,
    styles.sizes[size].root,
    styles.variants[variant].root,
    isIconOnly && 'aspect-square p-0',
    className,
  )

  const content = (
    <>
      {isValidElement(IconLeading) && IconLeading}
      {isReactComponent(IconLeading) && <IconLeading data-icon="leading" className={iconClassName} />}

      {children && <span data-text>{children}</span>}

      {isValidElement(IconTrailing) && IconTrailing}
      {isReactComponent(IconTrailing) && <IconTrailing data-icon="trailing" className={iconClassName} />}
    </>
  )

  if (href) {
    return (
      <AriaLink
        href={isDisabled ? undefined : href}
        data-icon-only={isIconOnly ? true : undefined}
        isDisabled={isDisabled}
        className={sharedClassName}
      >
        {content}
      </AriaLink>
    )
  }

  return (
    <AriaButton
      type="button"
      data-icon-only={isIconOnly ? true : undefined}
      isDisabled={isDisabled}
      className={sharedClassName}
      {...props}
    >
      {content}
    </AriaButton>
  )
}
