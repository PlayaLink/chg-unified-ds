import figma from '@figma/code-connect'
import { Divider } from './Divider'

/**
 * Figma Code Connect for Divider component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=73-674
 */
figma.connect(Divider, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=73:674', {
  props: {
    appearance: figma.enum('Appearance', {
      'Solid': 'solid',
      'Transparent': 'transparent',
    }),
    alignment: figma.enum('Alignment', {
      'None': 'none',
      'Left': 'left',
      'Center': 'center',
      'Right': 'right',
    }),
    type: figma.enum('Type', {
      'Label': 'label',
      'Title': 'title',
      'Action': 'action',
      'Icon': 'icon',
    }),
    label: figma.string('Label'),
  },
  example: (props) => <Divider {...props} />,
})
