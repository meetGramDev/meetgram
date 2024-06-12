import type { Meta, StoryObj } from '@storybook/react'

import { BackButton } from './BackButton'

const meta = {
  args: {},
  component: BackButton,
  tags: ['autodocs'],
  title: 'Shared/Button',
} satisfies Meta<typeof BackButton>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonWithUseRouter: Story = {
  args: {
    label: `${String.fromCharCode(8592)} Back to some page`,
  },
}
