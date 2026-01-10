import figma from '@figma/code-connect'
import { ProgressBar } from './ProgressBar'

/**
 * Figma Code Connect for ProgressBar component
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=5282-681
 */
figma.connect(ProgressBar, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=5282:681', {
  props: {
    value: figma.enum('Progress', {
      '0%': 0,
      '10%': 10,
      '20%': 20,
      '30%': 30,
      '40%': 40,
      '50%': 50,
      '60%': 60,
      '70%': 70,
      '80%': 80,
      '90%': 90,
      '100%': 100,
    }),
    label: figma.enum('Label', {
      'Right': 'right',
      'Bottom': 'bottom',
      'Top floating': 'top-floating',
      'Bottom floating': 'bottom-floating',
      'False': false,
    }),
  },
  example: (props) => <ProgressBar {...props} />,
})
