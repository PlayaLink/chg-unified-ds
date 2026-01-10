/**
 * Divider component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=73-674
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export const styles = sortCx({
  common: {
    root: 'flex w-full items-center',
    line: 'h-px flex-1 bg-gray-200',
    lineShort: 'h-px w-12 bg-gray-200',
    content: 'flex shrink-0 items-center',
  },
  appearances: {
    solid: {
      content: 'border border-gray-200 bg-base-white',
    },
    transparent: {
      content: '',
    },
  },
  types: {
    label: {
      content: 'rounded-9999 px-12 py-4 text-xs text-gray-700',
    },
    title: {
      content: 'rounded-9999 px-16 py-8 text-sm font-semibold text-gray-700',
    },
    action: {
      content: 'gap-4 rounded-9999 px-12 py-8 text-xs font-semibold text-gray-700',
      icon: 'size-12',
    },
    icon: {
      content: 'rounded-9999 p-8',
      icon: 'size-16',
    },
  },
})

export type DividerAppearance = keyof typeof styles.appearances
export type DividerAlignment = 'none' | 'left' | 'center' | 'right'
export type DividerType = keyof typeof styles.types

export interface DividerProps {
  /** Visual appearance of the divider content */
  appearance?: DividerAppearance
  /** Alignment of the content */
  alignment?: DividerAlignment
  /** Type of content to display */
  type?: DividerType
  /** Label text (for label, title, and action types) */
  label?: string
  /** Icon component or element (for action and icon types) */
  icon?: FC<{ className?: string }> | ReactNode
  /** Additional className */
  className?: string
}

export function Divider({
  appearance = 'solid',
  alignment = 'none',
  type = 'label',
  label,
  icon: Icon,
  className,
}: DividerProps) {
  // If no alignment, render simple line
  if (alignment === 'none') {
    return (
      <div className={cx(styles.common.root, className)} role="separator">
        <div className={styles.common.line} />
      </div>
    )
  }

  const contentClassName = cx(
    styles.common.content,
    styles.appearances[appearance].content,
    styles.types[type].content,
  )

  const iconClassName = 'icon' in styles.types[type]
    ? styles.types[type].icon as string
    : undefined

  const renderContent = () => {
    if (type === 'icon') {
      return (
        <>
          {isValidElement(Icon) && Icon}
          {isReactComponent(Icon) && <Icon className={iconClassName} />}
        </>
      )
    }

    if (type === 'action') {
      return (
        <>
          {isValidElement(Icon) && Icon}
          {isReactComponent(Icon) && <Icon className={iconClassName} />}
          {label && <span>{label}</span>}
        </>
      )
    }

    // label or title type
    return label ? <span>{label}</span> : null
  }

  const content = renderContent()

  // If no content to show, render simple line
  if (!content || (type !== 'icon' && !label) || ((type === 'icon' || type === 'action') && !Icon && !label)) {
    return (
      <div className={cx(styles.common.root, className)} role="separator">
        <div className={styles.common.line} />
      </div>
    )
  }

  return (
    <div className={cx(styles.common.root, className)} role="separator">
      {alignment === 'left' && <div className={styles.common.lineShort} />}
      {(alignment === 'center' || alignment === 'right') && <div className={styles.common.line} />}

      <div className={contentClassName}>
        {content}
      </div>

      {alignment === 'right' && <div className={styles.common.lineShort} />}
      {(alignment === 'center' || alignment === 'left') && <div className={styles.common.line} />}
    </div>
  )
}
