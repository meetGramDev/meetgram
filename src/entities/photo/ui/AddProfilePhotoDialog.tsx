import { ReactNode } from 'react'

import { Button, Dialog } from '@/shared/ui'

import s from './Photo.module.scss'

import { Photo } from './Photo'

type Props = {
  children: ReactNode
  onDialogClose: (open: boolean) => void
}

export const AddProfilePhotoDialog = ({ children, onDialogClose }: Props) => {
  return (
    <>
      <Photo type={'empty'} />
      <Dialog
        className={s.dialog}
        onOpenChange={onDialogClose}
        title={'Add a Profile Photo'}
        trigger={
          <Button fullWidth variant={'outlined'}>
            Add a profile photo
          </Button>
        }
      >
        {children}
      </Dialog>
    </>
  )
}
