/**
 * Toast component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4397-6690
 * @storybook https://www.chg-unified-design.com/?path=/story/components-toast--props
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'
import { Avatar, type AvatarProps } from '../Avatar'
import { Button } from '../Button'
import { DotStatus, type DotStatusAppearance } from '../DotStatus'

export const styles = sortCx({
  common: {
    root: [
      'flex items-start rounded-8 border border-gray-200 bg-base-white shadow-lg',
    ].join(' '),
    content: 'flex min-w-0 flex-1 flex-col justify-center',
    title: 'text-md font-semibold text-gray-900',
    description: 'text-md text-gray-500',
    actionsSubtle: 'flex gap-24',
    actionsButtons: 'flex gap-12',
    actionLink: 'cursor-pointer text-md font-medium transition-colors',
    actionLinkPrimary: 'text-brand-600 hover:text-brand-700',
    actionLinkSecondary: 'text-gray-900 hover:text-gray-700',
    closeButton: [
      'shrink-0 cursor-pointer rounded-4 p-4 text-gray-400 transition-colors',
      'hover:bg-gray-100 hover:text-gray-600',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
    ].join(' '),
    icon: 'shrink-0 text-brand-600',
    dotWrapper: 'flex shrink-0 items-center p-8',
  },
  sizes: {
    default: {
      root: 'gap-16 p-24',
      content: 'gap-0',
      actions: 'pt-16',
      icon: 'size-[36px]',
    },
    condensed: {
      root: 'items-center gap-12 p-16',
      content: '',
      actions: 'pl-16',
      icon: 'size-[36px]',
    },
  },
})

export type ToastSize = keyof typeof styles.sizes
export type ToastAppearance = 'icon' | 'dot' | 'avatar'
export type ToastActions = 'none' | 'close' | 'subtle' | 'buttons'

// Close icon component
const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

// Default success icon
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 36 36" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33ZM25.2803 14.7803C25.5732 14.4874 25.5732 14.0126 25.2803 13.7197C24.9874 13.4268 24.5126 13.4268 24.2197 13.7197L15.75 22.1893L11.7803 18.2197C11.4874 17.9268 11.0126 17.9268 10.7197 18.2197C10.4268 18.5126 10.4268 18.9874 10.7197 19.2803L15.2197 23.7803C15.5126 24.0732 15.9874 24.0732 16.2803 23.7803L25.2803 14.7803Z" />
  </svg>
)

export interface ToastProps {
  /** The title text */
  title: string
  /** The description text (only shown in default size) */
  description?: string
  /** The visual appearance - what shows on the left */
  appearance?: ToastAppearance
  /** The action type to display */
  actions?: ToastActions
  /** The size variant */
  size?: ToastSize
  /** Custom icon component (for appearance="icon") */
  icon?: FC<{ className?: string }> | ReactNode
  /** Dot indicator color (for appearance="dot") */
  dotAppearance?: DotStatusAppearance
  /** Avatar props (for appearance="avatar") */
  avatarProps?: Omit<AvatarProps, 'size'>
  /** Primary action label (for actions="subtle" or "buttons") */
  primaryActionLabel?: string
  /** Secondary action label (for actions="subtle" or "buttons") */
  secondaryActionLabel?: string
  /** Callback when primary action is clicked */
  onPrimaryAction?: () => void
  /** Callback when secondary action is clicked */
  onSecondaryAction?: () => void
  /** Callback when close button is clicked (for actions="close") */
  onClose?: () => void
  /** Additional className */
  className?: string
}

export function Toast({
  title,
  description,
  appearance = 'icon',
  actions = 'none',
  size = 'default',
  icon: Icon,
  dotAppearance = 'green',
  avatarProps,
  primaryActionLabel = 'Undo',
  secondaryActionLabel = 'Dismiss',
  onPrimaryAction,
  onSecondaryAction,
  onClose,
  className,
}: ToastProps) {
  const sizeStyles = styles.sizes[size]
  const buttonSize = size === 'default' ? 'md' : 'sm'

  // Render leading element based on appearance
  const renderLeading = () => {
    switch (appearance) {
      case 'icon':
        const iconClassName = cx(styles.common.icon, sizeStyles.icon)
        if (isValidElement(Icon)) return Icon
        if (isReactComponent(Icon)) return <Icon className={iconClassName} />
        // Default to CheckCircleIcon if no icon provided
        return <CheckCircleIcon className={iconClassName} />

      case 'dot':
        return (
          <div className={styles.common.dotWrapper}>
            <DotStatus appearance={dotAppearance} size="default" />
          </div>
        )

      case 'avatar':
        return (
          <Avatar
            name={avatarProps?.name || 'User'}
            src={avatarProps?.src}
            initials={avatarProps?.initials}
            size="md"
          />
        )

      default:
        return null
    }
  }

  // Render actions based on type
  const renderActions = () => {
    if (actions === 'none' || actions === 'close') return null

    if (actions === 'subtle') {
      return (
        <div className={cx(styles.common.actionsSubtle, sizeStyles.actions)}>
          <button
            type="button"
            onClick={onPrimaryAction}
            className={cx(styles.common.actionLink, styles.common.actionLinkPrimary)}
          >
            {primaryActionLabel}
          </button>
          <button
            type="button"
            onClick={onSecondaryAction}
            className={cx(styles.common.actionLink, styles.common.actionLinkSecondary)}
          >
            {secondaryActionLabel}
          </button>
        </div>
      )
    }

    if (actions === 'buttons') {
      return (
        <div className={cx(styles.common.actionsButtons, sizeStyles.actions)}>
          <Button size={buttonSize} variant="primary" onPress={onPrimaryAction}>
            {primaryActionLabel}
          </Button>
          <Button size={buttonSize} variant="outline" onPress={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        </div>
      )
    }

    return null
  }

  // Render close button
  const renderClose = () => {
    if (actions !== 'close') return null

    return (
      <button
        type="button"
        onClick={onClose}
        className={styles.common.closeButton}
        aria-label="Close"
      >
        <CloseIcon />
      </button>
    )
  }

  // Condensed layout (single line)
  if (size === 'condensed') {
    return (
      <div
        className={cx(styles.common.root, sizeStyles.root, className)}
        role="alert"
      >
        {renderLeading()}
        <span className={cx(styles.common.title, 'flex-1')}>{title}</span>
        {renderActions()}
        {renderClose()}
      </div>
    )
  }

  // Default layout (two lines with description)
  return (
    <div
      className={cx(styles.common.root, sizeStyles.root, className)}
      role="alert"
    >
      {renderLeading()}
      <div className={cx(styles.common.content, sizeStyles.content)}>
        <span className={styles.common.title}>{title}</span>
        {description && (
          <span className={styles.common.description}>{description}</span>
        )}
        {renderActions()}
      </div>
      {renderClose()}
    </div>
  )
}
