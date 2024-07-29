import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { UploadPhoto } from './UploadPhoto'
import { UploadPhotoForm } from './UploadPhotoForm'

const meta = {
  args: {},
  component: UploadPhotoForm,
  tags: ['autodocs'],
  title: 'features/profile/UploadPhoto',
} satisfies Meta<typeof UploadPhotoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSend: fn(),
  },

  render: () => {
    return <UploadPhoto />
  },
}

export const ModalWindow: Story = {
  args: {
    onSend: fn(),
  },

  render: args => {
    return <UploadPhotoForm {...args} />
  },
}
