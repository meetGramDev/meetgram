import { toast } from 'react-toastify'

import { Button } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

import { ToastWrapper } from './toastWrapper'

const meta = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/ToastNotification',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Notification: Story = {
  render: () => {
    return (
      <ToastWrapper>
        <div className={'flex gap-6'}>
          <Button onClick={() => toast.success('Notification')} variant={'primary'}>
            Success
          </Button>
          <Button onClick={() => toast.warning('Notification')} variant={'primary'}>
            Warning
          </Button>
          <Button onClick={() => toast.error('Notification')} variant={'primary'}>
            Error
          </Button>
          <Button onClick={() => toast('Notification')} variant={'primary'}>
            Base
          </Button>
          <Button onClick={() => toast.info('Notification')} variant={'primary'}>
            Info
          </Button>
        </div>
      </ToastWrapper>
    )
  },
}
