import { Button } from '@/shared/ui'

type Props = {
  onConfirm: (confirm: boolean) => void
}

export const DeletePhotoForm = ({ onConfirm }: Props) => {
  return (
    <div className={'px-6 py-7'}>
      <p className={'mb-8 text-regular16 font-normal md:mb-12 md:pr-16'}>
        Are you sure you want to delete the photo?
      </p>
      <div className={'flex flex-wrap gap-6 md:justify-end'}>
        <Button onClick={() => onConfirm(true)} variant={'outlined'}>
          Yes
        </Button>
        <Button onClick={() => onConfirm(false)}>No</Button>
      </div>
    </div>
  )
}
