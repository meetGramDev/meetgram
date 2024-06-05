import Button from '@/shared/ui/button/button'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const Outlined: Story = {
  args: {
    children: 'Button',
    disabled: false,
    variant: 'outlined',
  },
}
export const Text: Story = {
  args: {
    children: 'Button',
    disabled: false,
    variant: 'text',
  },
}
export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    disabled: false,
    href: '#',
    variant: 'primary',
  },
}
export const FullWidth: Story = {
  args: {
    children: 'Button',
    fullWidth: true,
    variant: 'primary',
  },
}
