/**
 * ActionMenu pattern - dropdown menu with items and dividers
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=34-989
 */
'use client'

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'
import { createContext, useContext } from 'react'
import { cx, sortCx } from '@/utils/cx'

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  menu: {
    root: 'flex flex-col rounded-4 border border-gray-300 bg-base-white py-8 shadow-lg',
  },
  item: {
    root: [
      'flex cursor-pointer items-center gap-8 px-16 py-8 text-sm text-gray-900 transition-colors',
      'hover:bg-blue-50',
      'focus-visible:bg-blue-50 focus-visible:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
    ].join(' '),
    icon: 'size-16 shrink-0 text-gray-500',
  },
  divider: {
    root: 'my-4 h-px bg-gray-200',
  },
})

// =============================================================================
// CONTEXT
// =============================================================================

interface ActionMenuContextValue {
  onItemClick?: (value?: string) => void
}

const ActionMenuContext = createContext<ActionMenuContextValue>({})

// =============================================================================
// ACTION MENU
// =============================================================================

export interface ActionMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Called when a menu item is clicked */
  onItemClick?: (value?: string) => void
  /** Menu items */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function ActionMenu({
  onItemClick,
  children,
  className,
  ...props
}: ActionMenuProps) {
  return (
    <ActionMenuContext.Provider value={{ onItemClick }}>
      <div
        role="menu"
        className={cx(styles.menu.root, className)}
        {...props}
      >
        {children}
      </div>
    </ActionMenuContext.Provider>
  )
}

// =============================================================================
// ACTION MENU ITEM
// =============================================================================

export interface ActionMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional value identifier for the item */
  value?: string
  /** Icon to display before the label */
  icon?: ReactNode
  /** Item label */
  children?: ReactNode
  /** Additional className */
  className?: string
}

export function ActionMenuItem({
  value,
  icon,
  children,
  className,
  onClick,
  disabled,
  ...props
}: ActionMenuItemProps) {
  const { onItemClick } = useContext(ActionMenuContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.(e)
      onItemClick?.(value)
    }
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={cx(styles.item.root, className)}
      {...props}
    >
      {icon && <span className={styles.item.icon}>{icon}</span>}
      {children}
    </button>
  )
}

// =============================================================================
// ACTION MENU DIVIDER
// =============================================================================

export interface ActionMenuDividerProps {
  /** Additional className */
  className?: string
}

export function ActionMenuDivider({ className }: ActionMenuDividerProps) {
  return (
    <div
      role="separator"
      className={cx(styles.divider.root, className)}
    />
  )
}

// =============================================================================
// COMPOUND EXPORT
// =============================================================================

ActionMenu.Item = ActionMenuItem
ActionMenu.Divider = ActionMenuDivider
