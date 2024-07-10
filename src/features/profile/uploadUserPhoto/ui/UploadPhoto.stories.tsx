import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'

import { UploadPhoto } from './UploadPhoto'

const meta = {
  args: {},
  component: UploadPhoto,
  decorators: [StoreDecorator()],
  tags: ['autodocs'],
  title: 'features/profile/UploadPhoto',
} satisfies Meta<typeof UploadPhoto>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'empty',
    variant: 'round',
  },
}
