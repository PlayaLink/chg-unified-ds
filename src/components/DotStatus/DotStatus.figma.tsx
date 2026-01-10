import figma from '@figma/code-connect'
import { DotStatus } from './DotStatus'

/**
 * Figma Code Connect for DotStatus component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=450-6210
 */
figma.connect(DotStatus, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=450:6210', {
  props: {
    appearance: figma.enum('Appearance', {
      'Neutral': 'neutral',
      'Red': 'red',
      'Orange': 'orange',
      'Yellow': 'yellow',
      'Celery': 'celery',
      'Green': 'green',
      'Sky': 'sky',
      'Cyan': 'cyan',
      'Blue': 'blue',
      'Indigo': 'indigo',
      'Purple': 'purple',
      'Fuchsia': 'fuchsia',
      'Magenta': 'magenta',
      'Inverse': 'inverse',
    }),
    size: figma.enum('Size', {
      'Compact': 'compact',
      'Default': 'default',
    }),
    border: figma.enum('Border', {
      'true': true,
      'false': false,
    }),
  },
  example: (props) => <DotStatus {...props} />,
})
