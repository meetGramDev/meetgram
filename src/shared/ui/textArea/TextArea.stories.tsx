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
    fullWidth: false,
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}
export const TextAreaWithError: Story = {
  args: {
    disabled: false,
    error: 'Error text',
    fullWidth: false,
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}

export const TextAreaFullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}

export const TextAreaDisabled: Story = {
  args: {
    disabled: true,
    fullWidth: false,
    label: 'About me',
    onChange: () => {},
    value: 'Hello',
  },
}

export const TextAreaWithComponent = () => {
  const [text, setText] = useState('')
  const [disabled, setDisabled] = useState(false)

  const changeEventHandler = (message: string) => {
    setText(message)
  }

  return (
    <TextArea
      disabled={disabled}
      fullWidth
      label={'Alter text'}
      onChange={changeEventHandler}
      value={text}
    />
  )
}
