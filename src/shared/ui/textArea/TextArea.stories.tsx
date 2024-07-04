import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '@/shared/ui/textArea/TextArea'

const meta = {
  args: {
    label: 'TextArea',
  },
  component: TextArea,
  tags: ['autodocs'],
  title: 'shared/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaType: Story = {
  args: {
    // placeholder: 'Placeholder',
    label: 'About me',
  },
}
