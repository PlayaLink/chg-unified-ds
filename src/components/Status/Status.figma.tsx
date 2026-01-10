import figma from '@figma/code-connect'
import { Status } from './Status'

/**
 * Figma Code Connect for Status component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=326-10060
 */
figma.connect(Status, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=326:10060', {
  props: {
    isSolid: figma.enum('Solid', {
      'true': true,
      'false': false,
    }),
    isRounded: figma.enum('Rounded', {
      'true': true,
      'false': false,
    }),
    size: figma.enum('Size', {
      'Compact': 'compact',
      'Default': 'default',
    }),
  },
  example: (props) => <Status {...props}>Label</Status>,
})
