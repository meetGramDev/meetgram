import { useRef, useState } from 'react'

import { Photo, useDeletePhotoMutation, useUploadPhotoMutation } from '@/entities/photo'
import { cn } from '@/shared/lib/cn'
import { Nullable } from '@/shared/types'
import { Button, Dialog, Upload, UploadRef } from '@/shared/ui'

import { ErrorDialog } from './ErrorDialog'

type Props = {}

export const UploadPhoto = ({}: Props) => {
  const uploadRef = useRef<Nullable<UploadRef>>(null)
  const [fileUrl, setFileUrl] = useState<string>('')

  const [upload] = useUploadPhotoMutation()
  const [remove] = useDeletePhotoMutation()
  const isError = false

  const handleSelectFileClick = () => {
    // refer the Upload's input element
    uploadRef.current?.onSelectFile()
  }

  const handleFileSelect = (file: File) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const result = reader.result

      if (result && typeof result === 'string') {
        setFileUrl(result)
      }
    }

    reader.readAsDataURL(file)
  }

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
        <div>
          {isError && <ErrorDialog />}
          <div
            className={cn(
              'mx-6 mb-9 mt-3 flex flex-col items-center justify-center gap-8 text-center md:mx-16 md:mb-12 lg:mx-32 lg:mb-16 lg:mt-6 lg:gap-16'
            )}
          >
            {fileUrl && (
              <Photo
                alt={'uploaded file preview'}
                height={300}
                src={fileUrl}
                variant={'square'}
                width={300}
              />
            )}
            <Upload onFileSelect={handleFileSelect} ref={uploadRef}>
              {!fileUrl && <Photo type={'empty'} variant={'square'} />}
            </Upload>
            <Button fullWidth onClick={handleSelectFileClick} variant={'primary'}>
              Select from computer
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
