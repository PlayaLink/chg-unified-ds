import figma from '@figma/code-connect'
import { ActionMenu } from './ActionMenu'

/**
 * Figma Code Connect for ActionMenu pattern
 * @see https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=34-989
 */
figma.connect(ActionMenu, 'https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=34:989', {
  props: {},
  example: () => (
    <ActionMenu>
      <ActionMenu.Item>Edit</ActionMenu.Item>
      <ActionMenu.Item>Duplicate</ActionMenu.Item>
      <ActionMenu.Divider />
      <ActionMenu.Item>Delete</ActionMenu.Item>
    </ActionMenu>
  ),
})
