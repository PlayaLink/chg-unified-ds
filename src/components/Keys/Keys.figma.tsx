import figma from '@figma/code-connect'
import { Keys } from './Keys'

/**
 * Figma Code Connect for Keys component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4421-8719
 */
figma.connect(Keys, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4421:8719', {
  props: {
    appearance: figma.enum('Appearance', {
      'Light': 'light',
      'Dark': 'dark',
    }),
    type: figma.enum('Type', {
      'Flex': 'flex',
      'Fixed': 'fixed',
    }),
  },
  example: (props) => <Keys {...props}>⌘</Keys>,
})
