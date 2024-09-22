import { useState } from 'react'

import { Slider } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

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
    name: 'SliderComponent',
    onValueChange: (arr: number[]) => {},
    onValueCommit: (valueCounts: number[]) => {},
    step: 0.1,
  },
}
