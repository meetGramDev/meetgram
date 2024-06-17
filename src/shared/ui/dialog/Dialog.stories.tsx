import { Button } from '@/shared/ui/button/button'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog/Dialog'
import { Meta, StoryObj } from '@storybook/react'

import s from './Dialog.module.scss'

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
      <>
        <DialogTrigger asChild>
          <Button variant={'primary'}>Click me</Button>
        </DialogTrigger>
        <DialogContent
          description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
          title={'Title'}
        ></DialogContent>
      </>
    ),
  },
}

export const Failed: Story = {
  args: {
    children: (
      <>
        <div className={s.contentWidth}>
          <DialogContent
            description={'Transaction failed. Please, write to support'}
            title={'Error'}
          >
            <div className={s.child}>
              <Button className={s.button} variant={'primary'}>
                Back to payment
              </Button>
            </div>
          </DialogContent>
        </div>
      </>
    ),
    open: true,
  },
}

export const Success: Story = {
  args: {
    children: (
      <>
        <div className={s.contentWidth}>
          <DialogContent description={`Payment was successful!`} title={'Success'}>
            <div className={s.child}>
              <Button className={s.button} variant={'primary'}>
                OK
              </Button>
            </div>
          </DialogContent>
        </div>
      </>
    ),
    open: true,
  },
}
