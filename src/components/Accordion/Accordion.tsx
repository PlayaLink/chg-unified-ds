/**
 * Accordion component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=1221-27837
 * @storybook https://www.chg-unified-design.com/?path=/story/components-accordion--props
 */
'use client'

import type { ReactNode } from 'react'
import type {
  DisclosureGroupProps as AriaDisclosureGroupProps,
  DisclosureProps as AriaDisclosureProps,
} from 'react-aria-components'
import {
  DisclosureGroup as AriaDisclosureGroup,
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  Button as AriaButton,
  Heading,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

// ChevronDown icon
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const styles = sortCx({
  group: {
    root: 'flex flex-col',
  },
  item: {
    root: 'group flex flex-col border-b border-gray-200',
    trigger: [
      'flex w-full cursor-pointer items-center justify-between gap-16 px-16 py-12',
      'text-left text-md font-semibold text-gray-900',
      'outline-none focus-visible:ring-4 focus-visible:ring-brand-100 focus-visible:ring-inset',
      'disabled:cursor-not-allowed disabled:text-gray-400',
    ].join(' '),
    icon: [
      'size-[24px] shrink-0 text-gray-500',
      'transition-transform duration-200',
      'group-data-[expanded]:rotate-180',
    ].join(' '),
    panel: 'pb-24',
  },
})

export interface AccordionProps extends Omit<AriaDisclosureGroupProps, 'className'> {
  /** Allow multiple items to be expanded simultaneously. Default: true */
  allowsMultipleExpanded?: boolean
  /** Additional className */
  className?: string
  /** AccordionItem children */
  children?: ReactNode
}

export function Accordion({
  allowsMultipleExpanded = true,
  className,
  children,
  ...props
}: AccordionProps) {
  return (
    <AriaDisclosureGroup
      allowsMultipleExpanded={allowsMultipleExpanded}
      className={cx(styles.group.root, className)}
      {...props}
    >
      {children}
    </AriaDisclosureGroup>
  )
}

export interface AccordionItemProps extends Omit<AriaDisclosureProps, 'className' | 'children'> {
  /** Header title text */
  title: string
  /** Additional className */
  className?: string
  /** Collapsible content */
  children?: ReactNode
}

export function AccordionItem({
  title,
  className,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <AriaDisclosure className={cx(styles.item.root, className)} {...props}>
      <Heading>
        <AriaButton slot="trigger" className={styles.item.trigger}>
          <span>{title}</span>
          <ChevronDownIcon className={styles.item.icon} />
        </AriaButton>
      </Heading>
      <AriaDisclosurePanel className={styles.item.panel}>
        {children}
      </AriaDisclosurePanel>
    </AriaDisclosure>
  )
}
