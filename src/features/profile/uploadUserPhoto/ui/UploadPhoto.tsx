import { Photo, useDeletePhotoMutation, useUploadPhotoMutation } from '@/entities/photo'
import { cn } from '@/shared/lib/cn'
import { Button, Dialog } from '@/shared/ui'

import { ErrorDialog } from './ErrorDialog'

type Props = {}

export const UploadPhoto = ({}: Props) => {
  const [upload] = useUploadPhotoMutation()
  const [remove] = useDeletePhotoMutation()
  const isError = false

  return (
    <div className={'flex h-full w-full flex-col items-center gap-6 text-center'}>
      <Photo type={'empty'} />
      <Dialog
        title={'Add a Profile Photo'}
        trigger={
          <Button fullWidth variant={'outlined'}>
            Add a profile photo
          </Button>
        }
      >
        {isError && <ErrorDialog />}

        <div
          className={cn(
            'mx-6 mb-9 mt-3 flex flex-col items-center justify-center gap-8 text-center md:mx-16 md:mb-12 lg:mx-32 lg:mb-16 lg:mt-6 lg:gap-16'
          )}
        >
          <Photo type={'empty'} variant={'square'} />
          <Button fullWidth variant={'primary'}>
            Select from computer
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
