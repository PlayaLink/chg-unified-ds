import figma from '@figma/code-connect'
import { Button } from './Button'

/**
 * Figma Code Connect for Button component
 * @see https://www.figma.com/design/LkIyThUA0oVNsDEAyOF7ER/Design-System--Components?node-id=19-360
 */
figma.connect(Button, 'https://www.figma.com/design/LkIyThUA0oVNsDEAyOF7ER/Design-System--Components?node-id=19:360', {
  props: {
    variant: figma.enum('Appearance', {
      'Primary': 'primary',
      'Soft': 'soft',
      'Outline': 'outline',
      'Text': 'text',
      'Ghost': 'ghost',
      'Destructive': 'destructive',
    }),
    size: figma.enum('Size', {
      'XSmall': 'xs',
      'Small': 'sm',
      'Default': 'md',
      'Large': 'lg',
    }),
    children: figma.string('Label'),
    isDisabled: figma.enum('Appearance', {
      'Disabled': true,
    }),
  },
  example: (props) => <Button {...props} />,
})
