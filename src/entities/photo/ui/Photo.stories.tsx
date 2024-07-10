import { useState } from 'react'

import imgPreview from '@/shared/assets/img/photo-preview.png'
import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog'
import { Meta, StoryObj } from '@storybook/react'

import { Photo } from './Photo'

const meta = {
  component: Photo,
  tags: ['autodocs'],
  title: 'Entities/Photo',
} satisfies Meta<typeof Photo>

export default meta
type Story = StoryObj<typeof meta>

const img = {
  alt: 'a man',
  src: imgPreview,
}

export const Default: Story = {
  args: {
    alt: img.alt,
    src: img.src,
  },
}

export const SquareAvatar: Story = {
  args: {
    alt: img.alt,
    src: img.src,
    variant: 'square',
  },
}

export const WithoutImage: Story = {
  args: {
    type: 'empty',
    variant: 'round',
  },
}

export const WithDeleteIcon: Story = {
  args: {
    alt: img.alt,
    src: img.src,
    variant: 'round',
  },

  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <Photo onDelete={() => setOpen(true)} {...args} />
        <Dialog onOpenChange={setOpen} open={open} title={'Delete photo'}>
          <div style={{ margin: '1.875rem 1.5rem' }}>
            <p>Are you sure you want to delete the photo?</p>
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'end',
                margin: '1.875rem 0 2.25rem',
                paddingRight: '1.5rem',
              }}
            >
              <Button onClick={() => setOpen(false)} style={{ width: '6rem' }} variant={'outlined'}>
                Yes
              </Button>
              <Button onClick={() => setOpen(false)} style={{ width: '6rem' }} variant={'primary'}>
                No
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
}
