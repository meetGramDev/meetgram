import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextArea } from '@/shared/ui/textArea/TextArea'

const meta = {
  args: {
    label: 'TextArea',
  },
  component: TextArea,
  tags: ['autodocs'],
  title: 'shared/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaType: Story = {
  args: {
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}
export const TextAreaWithError: Story = {
  args: {
    error: 'Error ',
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}

export const TextAreaWithComponent = () => {
  const [text, setText] = useState('')

  return <TextArea label={'Alter text'} onChange={setText} value={text} />
}
