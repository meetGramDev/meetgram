import { StoreProvider } from '@/app/lib'
import { LogOut } from '@/features/auth/logOut'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: LogOut,
  tags: ['autodocs'],
  title: 'features/auth/LogOut',
} satisfies Meta<typeof LogOut>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'Epam@epam.com',
  },
  decorators: [story => <StoreProvider>{story()}</StoreProvider>],
}
