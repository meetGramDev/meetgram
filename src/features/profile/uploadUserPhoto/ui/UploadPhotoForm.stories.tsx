import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'
import { fn } from '@storybook/test'

import { UploadPhotoForm } from './UploadPhotoForm'

const meta = {
  args: {},
  component: UploadPhotoForm,
  decorators: [StoreDecorator()],
  tags: ['autodocs'],
  title: 'features/profile/UploadPhotoForm',
} satisfies Meta<typeof UploadPhotoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSend: fn(),
  },
}
