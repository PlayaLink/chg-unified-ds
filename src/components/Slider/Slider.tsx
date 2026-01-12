/**
 * Slider component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=5282-2501
 * @storybook https://www.chg-unified-design.com/?path=/story/components-slider--props
 */
'use client'

import type { SliderProps as AriaSliderProps } from 'react-aria-components'
import {
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'flex w-full flex-col',
    track: 'relative h-24 w-full',
    trackBar: 'absolute top-1/2 h-8 w-full -translate-y-1/2 rounded-full bg-gray-200',
    trackFill: 'absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-brand-600',
    thumb: [
      'top-1/2 size-24 rounded-full border border-gray-300 bg-gray-50 shadow-sm',
      'cursor-grab focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100',
      'dragging:cursor-grabbing',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
    output: 'absolute top-full left-1/2 mt-8 -translate-x-1/2 text-xs font-semibold text-gray-500',
  },
})

export interface SliderProps extends Omit<AriaSliderProps<number[]>, 'className'> {
  /** Show value labels below the thumbs */
  showLabels?: boolean
  /** Additional className */
  className?: string
  /** Format the output value */
  formatValue?: (value: number) => string
}

export function Slider({
  showLabels = false,
  className,
  formatValue = (v) => `${v}%`,
  ...props
}: SliderProps) {
  return (
    <AriaSlider
      className={cx(styles.common.root, className)}
      {...props}
    >
      {({ state }) => (
        <SliderTrack className={styles.common.track}>
          {/* Background track */}
          <div className={styles.common.trackBar} />

          {/* Progress fill between thumbs */}
          <div
            className={styles.common.trackFill}
            style={{
              left: `${state.getThumbPercent(0) * 100}%`,
              width: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
            }}
          />

          {/* Thumbs */}
          <SliderThumb index={0} className={styles.common.thumb} aria-label="Minimum value">
            {showLabels && (
              <SliderOutput className={styles.common.output}>
                {formatValue(state.values[0])}
              </SliderOutput>
            )}
          </SliderThumb>
          <SliderThumb index={1} className={styles.common.thumb} aria-label="Maximum value">
            {showLabels && (
              <SliderOutput className={styles.common.output}>
                {formatValue(state.values[1])}
              </SliderOutput>
            )}
          </SliderThumb>
        </SliderTrack>
      )}
    </AriaSlider>
  )
}
