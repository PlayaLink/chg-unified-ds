import figma from '@figma/code-connect'
import { Chip } from './Chip'

/**
 * Figma Code Connect for Chip component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=722-9956
 */
figma.connect(Chip, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=722:9956', {
  props: {
    isSelected: figma.enum('Selected', {
      'true': true,
      'false': false,
    }),
    isRounded: figma.enum('Rounded', {
      'true': true,
      'false': false,
    }),
    isDismissible: figma.enum('Dismiss', {
      'true': true,
      'false': false,
    }),
    size: figma.enum('Size', {
      'Default': 'default',
      'Compact': 'compact',
    }),
    children: figma.string('Label States'),
  },
  example: (props) => <Chip {...props} />,
})
