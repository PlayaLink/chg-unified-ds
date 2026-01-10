import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip'

/**
 * Figma Code Connect for Tooltip component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=730-22084
 */
figma.connect(Tooltip, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=730:22084', {
  props: {
    appearance: figma.enum('Appearance', {
      'Plain': 'plain',
      'Soft': 'soft',
      'Rich': 'rich',
      'Micro': 'micro',
    }),
    placement: figma.enum('Arrow Position', {
      'Bottom - Center': 'top',
      'Bottom - Left': 'top',
      'Bottom - Right': 'top',
      'Top - Center': 'bottom',
      'Top - Left ↖': 'bottom',
      'Top - Right': 'bottom',
      'Left - Center →': 'right',
      'Left - Top': 'right',
      'Left - Bottom': 'right',
      'Right - Center →': 'left',
      'Right - Top': 'left',
      'Right - Bottom': 'left',
    }),
  },
  example: (props) => (
    <Tooltip appearance={props.appearance} placement={props.placement}>
      Tooltip content
    </Tooltip>
  ),
})
