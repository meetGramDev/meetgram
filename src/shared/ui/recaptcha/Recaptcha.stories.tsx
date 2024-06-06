import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/shared/ui/recaptcha/Recaptcha'

const meta = {
  args: {
    onChange: token => {},
    siteKey: '6Le9h_IpAAAAAF6U0_jL6SNQKTXC_IuBTp-5ksOr',
  },
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'shared/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
