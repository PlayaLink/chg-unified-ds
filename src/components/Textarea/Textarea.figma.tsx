import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

/**
 * Figma Code Connect for Textarea component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=60-928
 */
figma.connect(Textarea, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=60:928', {
  props: {
    size: figma.enum('Size', {
      'Default': 'default',
      'Compact': 'compact',
    }),
    state: figma.enum('State', {
      'Default': 'default',
      'Focused': 'default',
      'Error': 'error',
      'Disabled': 'default',
    }),
    resize: figma.enum('Resize', {
      'true': true,
      'false': false,
    }),
    disabled: figma.enum('State', {
      'Disabled': true,
    }),
    placeholder: figma.enum('Placeholder', {
      'true': 'Placeholder',
    }),
  },
  example: (props) => (
    <Textarea
      size={props.size}
      state={props.state}
      resize={props.resize}
      disabled={props.disabled}
      placeholder={props.placeholder}
    />
  ),
})
