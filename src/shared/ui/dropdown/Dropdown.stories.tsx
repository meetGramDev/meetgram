import type { Meta, StoryObj } from '@storybook/react'

import { NotificationType } from '@/entities/notification/model/types/service.types'

import { Button } from '../button/button'
import Dropdown from '../dropdown/dropdown'

// type Option = {
//   id: number
//   label: string
// }

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Shared/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const options: NotificationType[] = [
  { createdAt: '12.08.2024', id: 1, isRead: false, message: 'Option 1', notifyAt: '' },
  { createdAt: '12.08.2024', id: 2, isRead: true, message: 'Option 2', notifyAt: '' },
  { createdAt: '12.08.2024', id: 3, isRead: false, message: 'Option 3', notifyAt: '' },
]

export const Default: Story = {
  args: {
    children: <Button>Click me to toggle dropdown</Button>,
    deleteNotification: (id: number) => console.log(`Delete notification ${id}`),
    isOpen: false,
    onSelect: (option: NotificationType) => console.log(`Selected: ${option.message}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options,
  },
}

export const WithCustomOptions: Story = {
  args: {
    children: <Button>Click me for custom options</Button>,
    deleteNotification: (id: number) => console.log(`Delete notification ${id}`),
    isOpen: false,
    onSelect: (option: NotificationType) => console.log(`You selected: ${option.message}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options: [
      { createdAt: '12.08.2024', id: 1, isRead: false, message: 'Option 1', notifyAt: '' },
      { createdAt: '12.08.2024', id: 2, isRead: true, message: 'Option 2', notifyAt: '' },
      { createdAt: '12.08.2024', id: 3, isRead: false, message: 'Option 3', notifyAt: '' },
    ],
  },
}

export const OpenedInitially: Story = {
  args: {
    children: <Button>Dropdown is open initially</Button>,
    deleteNotification: (id: number) => console.log(`Delete notification ${id}`),
    isOpen: true,
    onSelect: (option: NotificationType) => console.log(`Selected: ${option.message}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options,
  },
}

export const Disabled: Story = {
  args: {
    children: <Button>Click me for dropdown</Button>,
    deleteNotification: (id: number) => console.log(`Delete notification ${id}`),
    isOpen: false,
    onSelect: (option: NotificationType) => console.log(`Selected: ${option.message}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options: [
      { createdAt: '12.08.2024', id: 1, isRead: false, message: 'Option 1', notifyAt: '' },
      { createdAt: '12.08.2024', id: 2, isRead: true, message: 'Option 2', notifyAt: '' },
      { createdAt: '12.08.2024', id: 3, isRead: false, message: 'Option 3', notifyAt: '' },
    ],
  },
}

export const TextTrigger: Story = {
  args: {
    children: <span style={{ color: 'blue', cursor: 'pointer' }}>Click here for dropdown</span>,
    deleteNotification: (id: number) => console.log(`Delete notification ${id}`),
    isOpen: false,
    onSelect: (option: NotificationType) => console.log(`Selected: ${option.message}`),
    onToggle: (state: boolean) => console.log(`Dropdown toggled: ${state}`),
    options,
  },
}
