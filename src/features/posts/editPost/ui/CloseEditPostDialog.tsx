import { Button, Dialog } from '@/shared/ui'

type Props = {
  onClose: (value: boolean) => void
}

export const CloseEditPostDialog = ({ onClose }: Props) => {
  return (
    <Dialog title={'Close Post'}>
      <p>
        Do you really want to close the edition of the publication? If you close changes won’t be
        saved
      </p>
      <Button onClick={() => onClose(true)} variant={'outlined'}>
        Yes
      </Button>
      <Button onClick={() => onClose(false)} variant={'primary'}>
        No
      </Button>
    </Dialog>
  )
}
