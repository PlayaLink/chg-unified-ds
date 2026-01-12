/**
 * Radio component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=5282-1239
 * @storybook https://www.chg-unified-design.com/?path=/story/components-radio--props
 */
'use client'

import type { ReactNode } from 'react'
import type {
  RadioProps as AriaRadioProps,
  RadioGroupProps as AriaRadioGroupProps,
} from 'react-aria-components'
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  group: {
    root: 'flex flex-col gap-12',
  },
  radio: {
    root: 'group flex cursor-pointer items-center gap-12 outline-none',
    indicator: [
      'flex size-[20px] shrink-0 items-center justify-center rounded-9999',
      'bg-base-white ring-1 ring-gray-300 ring-inset',
      'group-data-[selected]:ring-[6px] group-data-[selected]:ring-brand-600',
      'group-data-[focus-visible]:outline group-data-[focus-visible]:outline-2 group-data-[focus-visible]:outline-offset-2 group-data-[focus-visible]:outline-brand-600',
      'group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-gray-100 group-data-[disabled]:ring-gray-200',
    ].join(' '),
    label: [
      'text-md text-gray-900',
      'group-data-[disabled]:text-gray-400',
    ].join(' '),
  },
})

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'className'> {
  /** Additional className */
  className?: string
  /** Radio items */
  children?: ReactNode
}

export function RadioGroup({
  className,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      className={cx(styles.group.root, className)}
      {...props}
    >
      {children}
    </AriaRadioGroup>
  )
}

export interface RadioProps extends Omit<AriaRadioProps, 'className' | 'children'> {
  /** Whether to show the label */
  showLabel?: boolean
  /** Additional className */
  className?: string
  /** Radio label */
  children?: ReactNode
}

export function Radio({
  showLabel = true,
  className,
  children,
  ...props
}: RadioProps) {
  return (
    <AriaRadio
      className={cx(styles.radio.root, className)}
      {...props}
    >
      <span className={styles.radio.indicator} />
      {showLabel && children && (
        <span className={styles.radio.label}>{children}</span>
      )}
    </AriaRadio>
  )
}
