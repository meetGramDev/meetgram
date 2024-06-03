import { Button } from '@/shared/ui/button/button'
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
    children: 'Primary button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

// import { Button } from '@/shared/ui/button/button'
//
// export default { component: Button, title: 'Button123' }
//
// export const Default = {}
