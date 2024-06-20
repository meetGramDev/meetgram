import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog/Dialog'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'shared/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ margin: '18px 24px 54px 24px' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
    ),
    title: 'Title',
    trigger: <Button variant={'primary'}>Click</Button>,
  },
}

export const Failed: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', width: '376px' }}>
        <div style={{ margin: '18px 0 54px 30px' }}>
          Transaction failed. Please, write to support
        </div>
        <div style={{ margin: '0 24px 36px 24px' }}>
          <Button style={{ width: '100%' }} variant={'primary'}>
            Back to payment
          </Button>
        </div>
      </div>
    ),
    title: 'Error',
    trigger: <Button variant={'primary'}>Click</Button>,
  },
}

export const Success: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', width: '376px' }}>
        <div style={{ margin: '18px 0 54px 24px' }}>Payment was successful!</div>
        <div style={{ margin: '0 24px 36px 24px' }}>
          <Button style={{ width: '100%' }} variant={'primary'}>
            OK
          </Button>
        </div>
      </div>
    ),
    title: 'Success',
    trigger: <Button variant={'primary'}>Click</Button>,
  },
}
