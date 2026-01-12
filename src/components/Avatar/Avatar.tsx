/**
 * Avatar component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=326-10076
 * @storybook https://www.chg-unified-design.com/?path=/story/components-avatar--props
 */
'use client'

import { cx, sortCx } from '@/utils/cx'
import { DotStatus, type DotStatusAppearance, type DotStatusSize } from '../DotStatus'

export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline'
export type AvatarSize = 'sm' | 'md' | 'lg'

// Semantic mapping from avatar status to DotStatus appearance
const statusToAppearance: Record<AvatarStatus, DotStatusAppearance> = {
  online: 'green',
  busy: 'red',
  away: 'orange',
  offline: 'neutral',
}

const avatarSizeToDotSize: Record<AvatarSize, DotStatusSize> = {
  sm: 'compact',
  md: 'default',
  lg: 'lg',
}

export const styles = sortCx({
  root: 'relative inline-block',
  sizes: {
    sm: {
      avatar: 'size-[32px]',
      text: 'text-xs',
    },
    md: {
      avatar: 'size-[48px]',
      text: 'text-sm',
    },
    lg: {
      avatar: 'size-[64px]',
      text: 'text-md',
    },
  },
  image: 'rounded-9999 object-cover',
  fallback: [
    'flex items-center justify-center rounded-9999',
    'bg-brand-700 font-bold text-base-white',
  ].join(' '),
})

export interface AvatarProps {
  /** User's full name - used for alt text and computing initials */
  name: string
  /** Image source URL (optional - falls back to initials) */
  src?: string
  /** Override computed initials (e.g., for edge cases) */
  initials?: string
  /** Status indicator - shows colored dot based on status type */
  status?: AvatarStatus
  /** Avatar size. Default: 'md' */
  size?: AvatarSize
  /** Additional className */
  className?: string
}

/**
 * Computes initials from a full name
 * "John Doe" → "JD", "Jane" → "J", "Mary Jane Watson" → "MW"
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return parts[0]?.[0]?.toUpperCase() || ''
}

export function Avatar({
  name,
  src,
  initials,
  status,
  size = 'md',
  className,
}: AvatarProps) {
  const displayInitials = initials || getInitials(name)
  const sizeStyles = styles.sizes[size]

  return (
    <div className={cx(styles.root, className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cx(styles.image, sizeStyles.avatar)}
        />
      ) : (
        <div
          className={cx(styles.fallback, sizeStyles.avatar, sizeStyles.text)}
          role="img"
          aria-label={name}
        >
          {displayInitials}
        </div>
      )}
      {status && (
        <DotStatus
          appearance={statusToAppearance[status]}
          size={avatarSizeToDotSize[size]}
          border
          className="absolute bottom-0 right-0 ring-base-white"
        />
      )}
    </div>
  )
}
