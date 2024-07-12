import { useRef, useState } from 'react'

import { Photo, useDeletePhotoMutation, useUploadPhotoMutation } from '@/entities/photo'
import { cn } from '@/shared/lib/cn'
import { Nullable } from '@/shared/types'
import { Button, Dialog, Dropzone, DropzoneRef } from '@/shared/ui'

import s from './UploadPhoto.module.scss'

import { ErrorDialog } from './ErrorDialog'

const MIN_DIMENSION = 192

type SelectedFileType = {
  blob: Nullable<File>
  height: number
  src: string
  width: number
}

type Props = {}

export const UploadPhoto = ({}: Props) => {
  const dropzoneRef = useRef<Nullable<DropzoneRef>>(null)
  const [file, setFile] = useState<SelectedFileType>({
    blob: null,
    height: 0,
    src: '',
    width: 0,
  })

  const [upload] = useUploadPhotoMutation()
  const [remove] = useDeletePhotoMutation()
  const [error, setError] = useState('')

  const resetState = () => {
    setFile({
      blob: null,
      height: 0,
      src: '',
      width: 0,
    })
    setError('')
  }

  const handleDialogClose = (open: boolean) => {
    if (!open && file.src) {
      resetState()
    }
  }

  const handleSelectFileClick = () => {
    resetState()
    // refer the Dropzone's input element
    dropzoneRef.current?.onSelectFile()
  }

  const handleFileSelect = (file: File) => {
    resetState()

    setFile(state => ({ ...state, blob: file }))

    const reader = new FileReader()

    reader.addEventListener('load', function (e) {
      const resultSrc = reader.result

      if (resultSrc && typeof resultSrc === 'string') {
        const imgEl = new Image()

        imgEl.src = resultSrc

        imgEl.addEventListener('load', function (e) {
          const { height, naturalHeight, naturalWidth, width } = e.currentTarget as HTMLImageElement

          if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
            setError('Image must be at least 192 x 192 pixels')

            return
          } else {
            setFile(state => ({ ...state, height, src: resultSrc, width }))
          }
        })
      }
    })

    reader.readAsDataURL(file)
  }

  const handleSendPhoto = () => {
    if (!file.blob) {
      return
    }
    const formData = new FormData()

    formData.append('file', file.blob)

    console.log('Click Save btn', formData.get('file'))
  }

  return (
    <div className={'flex h-full w-full flex-col items-center gap-6 text-center'}>
      <Photo type={'empty'} />

      <Dialog
        className={s.dialog}
        onOpenChange={handleDialogClose}
        title={'Add a Profile Photo'}
        trigger={
          <Button fullWidth variant={'outlined'}>
            Add a profile photo
          </Button>
        }
      >
        <div className={cn('mx-6 my-4 text-center', !file.src && 'md:mb-[4.5rem]')}>
          {error && <ErrorDialog message={error} />}
          <div
            className={cn(
              'mt-6 space-y-9 md:mx-32 md:space-y-14',
              !file.src && 'md:first:mt-[4.5rem]'
            )}
          >
            {!file.src && (
              <>
                <Dropzone onFileSelect={handleFileSelect} ref={dropzoneRef}>
                  <Photo type={'empty'} variant={'square'} />
                </Dropzone>
                <Button fullWidth onClick={handleSelectFileClick} variant={'primary'}>
                  Select from computer
                </Button>
              </>
            )}
          </div>

          {file.src && !error && (
            <div className={'space-y-9'}>
              <Photo
                alt={'uploaded file preview'}
                containerClassname={s.photo}
                height={file.height}
                src={file.src}
                variant={'square'}
                width={file.width}
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
