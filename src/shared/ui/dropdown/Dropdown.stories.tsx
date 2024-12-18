import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/button'
import Dropdown from '../dropdown/dropdown'

type Option = {
  id: number
  label: string
}

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Shared/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const options: Option[] = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
]

export const Default: Story = {
  args: {
    children: <Button>Click me to toggle dropdown</Button>,
    isOpen: false,
    onSelect: (option: Option) => console.log(`Selected: ${option.label}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options,
  },
}

export const WithCustomOptions: Story = {
  args: {
    children: <Button>Click me for custom options</Button>,
    isOpen: false,
    onSelect: (option: Option) => console.log(`You selected: ${option.label}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options: [
      { id: 1, label: 'Custom Option 1' },
      { id: 2, label: 'Custom Option 2' },
      { id: 3, label: 'Custom Option 3' },
    ],
  },
}

export const OpenedInitially: Story = {
  args: {
    children: <Button>Dropdown is open initially</Button>,
    isOpen: true,
    onSelect: (option: Option) => console.log(`Selected: ${option.label}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options,
  },
}

export const Disabled: Story = {
  args: {
    children: <Button>Click me for dropdown</Button>,
    isOpen: false,
    onSelect: (option: Option) => console.log(`Selected: ${option.label}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options: [
      { id: 1, label: 'Disabled Option' },
      { id: 2, label: 'Option 2' },
    ],
  },
}

export const TextTrigger: Story = {
  args: {
    children: <span style={{ color: 'blue', cursor: 'pointer' }}>Click here for dropdown</span>,
    isOpen: false,
    onSelect: (option: Option) => console.log(`Selected: ${option.label}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options,
  },
}
