import figma from '@figma/code-connect'
import { CounterBadge } from './CounterBadge'

/**
 * Figma Code Connect for CounterBadge component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=708-1015
 */
figma.connect(CounterBadge, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=708:1015', {
  props: {
    color: figma.enum('Appearance', {
      'Neutral': 'neutral',
      'Red': 'red',
      'Orange': 'orange',
      'Yellow': 'yellow',
      'Lime': 'lime',
      'Green': 'green',
      'Sky': 'sky',
      'Cyan': 'cyan',
      'Blue': 'blue',
      'Indigo': 'indigo',
      'Purple': 'purple',
      'Magenta': 'magenta',
      'Rose': 'rose',
      'Inverse': 'inverse',
    }),
    isSolid: figma.enum('Solid', {
      'true': true,
      'false': false,
    }),
    isRounded: figma.enum('Rounded', {
      'true': true,
      'false': false,
    }),
  },
  example: (props) => <CounterBadge {...props}>99+</CounterBadge>,
})
