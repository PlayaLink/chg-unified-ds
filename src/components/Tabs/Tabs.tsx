/**
 * Tabs component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=777-8875
 */
'use client'

import type { ReactNode } from 'react'
import type { TabsProps as AriaTabsProps, Key } from 'react-aria-components'
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export type TabsAppearance = 'underline' | 'block' | 'block-inverted'

export const styles = sortCx({
  root: 'w-full',
  tabList: {
    base: 'flex',
    appearances: {
      underline: 'gap-0 border-b border-gray-300',
      block: 'gap-0 border-b border-gray-300 pb-8',
      'block-inverted': 'gap-4 rounded-8 bg-brand-600 p-4',
    },
  },
  tab: {
    base: [
      'cursor-pointer px-16 py-8 text-base font-medium outline-none transition-colors',
      'data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-brand-600',
    ].join(' '),
    appearances: {
      underline: {
        default: 'border-b-2 border-transparent text-gray-600 hover:text-gray-900',
        selected: 'border-b-2 border-brand-600 text-brand-600',
      },
      block: {
        default: 'rounded-6 text-gray-600 hover:text-gray-900',
        selected: 'rounded-6 bg-brand-600 text-base-white shadow-sm',
      },
      'block-inverted': {
        default: 'rounded-6 text-base-white/70 hover:text-base-white',
        selected: 'rounded-6 bg-base-white text-brand-600',
      },
    },
    fill: 'flex-1 text-center',
  },
  tabPanel: 'mt-16 outline-none',
})

export interface TabItem {
  /** Unique identifier for the tab */
  id: string
  /** Tab label text */
  label: string
  /** Tab panel content */
  content: ReactNode
}

export interface TabsProps extends Omit<AriaTabsProps, 'className' | 'children'> {
  /** Visual appearance */
  appearance?: TabsAppearance
  /** Whether tabs stretch to fill container width */
  fill?: boolean
  /** Tab items configuration */
  items: TabItem[]
  /** Additional className */
  className?: string
}

export function Tabs({
  appearance = 'underline',
  fill = false,
  items,
  className,
  ...props
}: TabsProps) {
  const tabListClassName = cx(
    styles.tabList.base,
    styles.tabList.appearances[appearance],
  )

  const getTabClassName = (isSelected: boolean) => cx(
    styles.tab.base,
    isSelected
      ? styles.tab.appearances[appearance].selected
      : styles.tab.appearances[appearance].default,
    fill && styles.tab.fill,
  )

  return (
    <AriaTabs
      className={cx(styles.root, className)}
      {...props}
    >
      <AriaTabList className={tabListClassName}>
        {items.map((item) => (
          <AriaTab
            key={item.id}
            id={item.id}
            className={({ isSelected }) => getTabClassName(isSelected)}
          >
            {item.label}
          </AriaTab>
        ))}
      </AriaTabList>
      {items.map((item) => (
        <AriaTabPanel key={item.id} id={item.id} className={styles.tabPanel}>
          {item.content}
        </AriaTabPanel>
      ))}
    </AriaTabs>
  )
}
