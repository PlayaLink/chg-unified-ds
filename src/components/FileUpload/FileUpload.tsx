/**
 * FileUpload component - dropzone for file uploads
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=3765-8060
 * @storybook https://www.chg-unified-design.com/?path=/story/components-fileupload--props
 */
'use client'

import type { ReactNode, DragEvent, ChangeEvent } from 'react'
import { useRef, useState, useCallback } from 'react'
import { cx, sortCx } from '@/utils/cx'

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  common: {
    root: [
      'flex cursor-pointer flex-col items-center gap-4 rounded-6 border-2 border-dashed p-24 transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
    ].join(' '),
    icon: 'size-[17px] text-gray-500',
    instructions: 'text-center text-sm font-medium text-gray-900',
    fileTypes: 'text-center text-xs text-gray-500',
  },
  state: {
    default: { root: 'border-gray-300 bg-base-white hover:border-gray-400 hover:bg-gray-50' },
    dragActive: { root: 'border-brand-500 bg-brand-50' },
    disabled: { root: 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60' },
    error: { root: 'border-error-500 bg-error-50' },
  },
})

// =============================================================================
// TYPES
// =============================================================================

export type FileUploadState = keyof typeof styles.state

export interface FileUploadProps {
  /** Instructions text shown in the dropzone */
  instructions?: ReactNode
  /** File type hint text */
  fileTypesHint?: string
  /** Custom icon element */
  icon?: ReactNode
  /** Accept attribute for file input (e.g., "image/*,.pdf") */
  accept?: string
  /** Allow multiple file selection */
  multiple?: boolean
  /** Disabled state */
  isDisabled?: boolean
  /** Error state */
  hasError?: boolean
  /** Called when files are selected or dropped */
  onFilesChange?: (files: FileList | null) => void
  /** Additional className */
  className?: string
}

// =============================================================================
// DEFAULT ICON
// =============================================================================

const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 17 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 10v2.667A1.334 1.334 0 0 1 13.167 14H3.833A1.334 1.334 0 0 1 2.5 12.667V10" />
    <path d="M11.833 5.333 8.5 2l-3.333 3.333" />
    <path d="M8.5 2v8" />
  </svg>
)

// =============================================================================
// COMPONENT
// =============================================================================

export function FileUpload({
  instructions = 'Drop files here or click to upload',
  fileTypesHint = 'PNG, JPG up to 10MB',
  icon,
  accept,
  multiple = false,
  isDisabled = false,
  hasError = false,
  onFilesChange,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  // Determine visual state
  const state: FileUploadState = isDisabled
    ? 'disabled'
    : hasError
      ? 'error'
      : isDragActive
        ? 'dragActive'
        : 'default'

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      inputRef.current?.click()
    }
  }, [isDisabled])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      inputRef.current?.click()
    }
  }, [isDisabled])

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDisabled) {
      setIsDragActive(true)
    }
  }, [isDisabled])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    if (!isDisabled && e.dataTransfer.files?.length) {
      onFilesChange?.(e.dataTransfer.files)
    }
  }, [isDisabled, onFilesChange])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onFilesChange?.(e.target.files)
  }, [onFilesChange])

  return (
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cx(
        styles.common.root,
        styles.state[state].root,
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={isDisabled}
        onChange={handleInputChange}
        className="sr-only"
        aria-hidden="true"
      />
      {icon ?? <UploadIcon className={styles.common.icon} />}
      <div className={styles.common.instructions}>{instructions}</div>
      {fileTypesHint && <div className={styles.common.fileTypes}>{fileTypesHint}</div>}
    </div>
  )
}
