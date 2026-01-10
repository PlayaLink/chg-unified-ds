import figma from '@figma/code-connect'
import { Field } from './Field'

/**
 * Figma Code Connect for Field component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4501-15801
 */
figma.connect(Field, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=4501:15801', {
  props: {
    orientation: figma.enum('Orientation', {
      'Vertical': 'vertical',
      'Horizontal': 'horizontal',
    }),
    isRequired: figma.enum('Required', {
      'true': true,
      'false': false,
    }),
    showInfoIcon: figma.enum('Info', {
      'true': true,
      'false': false,
    }),
    helperText: figma.enum('Helper', {
      'true': 'Helper Message',
      'false': undefined,
    }),
    showCounter: figma.enum('Counter', {
      'true': true,
      'false': false,
    }),
  },
  example: (props) => (
    <Field
      label="Label"
      {...props}
      currentCount={props.showCounter ? 25 : undefined}
      maxCount={props.showCounter ? 100 : undefined}
      infoText={props.showInfoIcon ? 'Info' : undefined}
    >
      {/* Your input component */}
    </Field>
  ),
})
