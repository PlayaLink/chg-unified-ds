import figma from '@figma/code-connect'
import { Tag } from './Tag'

/**
 * Figma Code Connect for Tag component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=717-4274
 */
figma.connect(Tag, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=717:4274', {
  props: {
    color: figma.enum('Color', {
      'Neutral': 'neutral',
      'Red': 'red',
      'Orange': 'orange',
      'Yellow': 'yellow',
      'Emerald': 'emerald',
      'Green': 'green',
      'Sky': 'sky',
      'Cyan': 'cyan',
      'Blue': 'blue',
      'Indigo': 'indigo',
      'Purple': 'purple',
      'Fuchsia': 'fuchsia',
      'Magenta': 'magenta',
      'Inverse': 'inverse',
      'Transparent': 'transparent',
    }),
    size: figma.enum('Size', {
      'Compact': 'compact',
      'Default': 'default',
    }),
    isSolid: figma.enum('Solid', {
      'true': true,
      'false': false,
    }),
    isRounded: figma.enum('Rounded', {
      'true': true,
      'false': false,
    }),
    hasIcon: figma.enum('Appearance', {
      'Label Only': false,
      'Icon Left': true,
    }),
  },
  example: (props) => (
    <Tag
      color={props.color}
      size={props.size}
      isSolid={props.isSolid}
      isRounded={props.isRounded}
      icon={props.hasIcon ? <IconPlaceholder /> : undefined}
    >
      Label
    </Tag>
  ),
})

// Placeholder for icon - users will replace with actual icon
const IconPlaceholder = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="6" />
  </svg>
)
