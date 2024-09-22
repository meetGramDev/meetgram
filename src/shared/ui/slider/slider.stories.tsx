import { Slider } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Slider,
  parameters: {},
  tags: ['autodocs'],
  title: 'shared/Slider',
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const SliderVar: Story = {
  args: {
    max: 3,
    min: 1,
    step: 0.1,
  },
}
