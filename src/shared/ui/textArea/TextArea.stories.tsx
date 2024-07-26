import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

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
  },
}
export const TextAreaWithError: Story = {
  args: {
    disabled: false,
    error: 'Error text',
    label: 'About me',
  },
}

export const TextAreaFullWidth: Story = {
  args: {
    label: 'About me',
  },
}

export const TextAreaDisabled: Story = {
  args: {
    disabled: true,
    label: 'About me',
    value: 'Hello',
  },
}

export const TextAreaWithComponent = () => {
  const [text, setText] = useState('')
  const [disabled, setDisabled] = useState(false)

  const changeEventHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value)
  }

  return (
    <TextArea disabled={disabled} label={'Alter text'} onChange={changeEventHandler} value={text} />
  )
}
