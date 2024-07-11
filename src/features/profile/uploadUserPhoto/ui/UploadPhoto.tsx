import { useRef, useState } from 'react'

import { Photo, useDeletePhotoMutation, useUploadPhotoMutation } from '@/entities/photo'
import { cn } from '@/shared/lib/cn'
import { Nullable } from '@/shared/types'
import { Button, Dialog, Upload, UploadRef } from '@/shared/ui'

import s from './UploadPhoto.module.scss'

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

  const handleSendPhoto = () => {
    // send photo to the server
    console.log('Click Save btn')
  }

  return (
    <div className={'flex h-full w-full flex-col items-center gap-6 text-center'}>
      <Photo type={'empty'} />

      <Dialog
        className={s.dialog}
        onOpenChange={open => !open && fileUrl && setFileUrl('')}
        title={'Add a Profile Photo'}
        trigger={
          <Button fullWidth variant={'outlined'}>
            Add a profile photo
          </Button>
        }
      >
        <div className={cn('mx-6 my-4 text-center', !fileUrl && 'md:mb-[4.5rem]')}>
          {isError && <ErrorDialog />}
          <div
            className={cn(
              'mt-6 space-y-9 md:mx-32 md:space-y-14',
              !fileUrl && 'md:first:mt-[4.5rem]'
            )}
          >
            <Upload onFileSelect={handleFileSelect} ref={uploadRef}>
              {!fileUrl && <Photo type={'empty'} variant={'square'} />}
            </Upload>
            {!fileUrl && (
              <Button fullWidth onClick={handleSelectFileClick} variant={'primary'}>
                Select from computer
              </Button>
            )}
          </div>

          {fileUrl && (
            <div className={'space-y-9'}>
              <Photo
                alt={'uploaded file preview'}
                containerClassname={s.photo}
                height={680}
                src={fileUrl}
                variant={'square'}
                width={340}
              />

              <div className={'flex w-full justify-end'}>
                <Button onClick={handleSendPhoto} variant={'primary'}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  )
}
