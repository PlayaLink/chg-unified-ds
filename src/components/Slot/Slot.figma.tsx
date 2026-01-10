import figma from '@figma/code-connect'
import { Slot } from './Slot'

/**
 * Figma Code Connect for Slot component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=3585-1237
 */
figma.connect(Slot, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=3585:1237', {
  props: {
    appearance: figma.enum('Appearance', {
      'Default': 'default',
      'Thin': 'thin',
    }),
  },
  example: (props) => <Slot {...props} />,
})
