import { I18N } from '@/shared/ui/i18n/I18N'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof I18N> = {
  args: {},
  component: I18N,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/I18N',
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
