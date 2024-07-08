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
    disabled: false,
    error: 'Error text',
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}

export const TextAreaFullWidth: Story = {
  args: {
    label: 'About me',
    onChange: () => {},
    value: '',
  },
}

export const TextAreaDisabled: Story = {
  args: {
    disabled: true,
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
      label={'Alter text'}
      onChange={e => changeEventHandler(e as string)}
      value={text}
    />
  )
}
