import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'
import { fn } from '@storybook/test'

import { UserSettingsForm } from './UserSettingsForm'

const meta = {
  args: {
    data: {
      aboutMe: '',
      avatars: [],
      city: '',
      country: 'Great Britain',
      createdAt: '',
      dateOfBirth: '',
      firstName: 'John',
      id: 1,
      lastName: 'Doe',
      userName: 'New user',
    },
    onSubmit: fn(),
  },
  component: UserSettingsForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/UserSettingsForm',
} satisfies Meta<typeof UserSettingsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
