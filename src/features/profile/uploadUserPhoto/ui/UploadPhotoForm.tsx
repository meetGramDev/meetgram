import { useEffect, useRef, useState } from 'react'

import { Photo } from '@/entities/photo'
import { cn } from '@/shared/lib/cn'
import { Nullable } from '@/shared/types'
import { Button, Dropzone, DropzoneRef } from '@/shared/ui'

import s from './UploadPhoto.module.scss'

import { UploadMessage } from './UploadMessage'
import { UploadedPhotoType } from './UploadPhoto'

const MIN_DIMENSION = 192
const PREVIEW_DIMENSION = 300

interface SelectedFileType extends UploadedPhotoType {
  blob: Nullable<File>
}

type Props = {
  onErrorMessage?: string
  onSend: (file: File) => void
  onSuccessMessage?: string
}

export const UploadPhotoForm = ({ onErrorMessage, onSend, onSuccessMessage }: Props) => {
  const dropzoneRef = useRef<Nullable<DropzoneRef>>(null)
  const [file, setFile] = useState<SelectedFileType>({
    blob: null,
    height: 0,
    src: '',
    width: 0,
  })
  const [error, setError] = useState(() => onErrorMessage || '')
  const [success, setSuccess] = useState(() => onSuccessMessage || '')

  const resetState = () => {
    setFile({
      blob: null,
      height: 0,
      src: '',
      width: 0,
    })
    setError('')
    setSuccess('')
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

  const handleSaveClick = () => {
    if (!file.blob) {
      return
    }

    onSend(file.blob)
  }

  return (
    <div className={cn('mx-6 my-4 text-center', !file.src && 'md:mb-[4.5rem]')}>
      {(error || onErrorMessage) && (
        <UploadMessage message={error || onErrorMessage} type={'error'} />
      )}
      {(success || onSuccessMessage) && (
        <UploadMessage message={success || onSuccessMessage} type={'success'} />
      )}

      <div
        className={cn('mt-6 space-y-9 md:mx-32 md:space-y-14', !file.src && 'md:first:mt-[4.5rem]')}
      >
        {!file.src && (
          <div className={'flex flex-col items-center justify-center gap-9'}>
            <Dropzone onFileSelect={handleFileSelect} ref={dropzoneRef}>
              <Photo type={'empty'} variant={'square'} />
            </Dropzone>
            <Button fullWidth onClick={handleSelectFileClick} variant={'primary'}>
              Select from computer
            </Button>
          </div>
        )}
      </div>

      {file.src && !error && (
        <div className={'space-y-9'}>
          <div className={'relative'}>
            <Photo
              alt={'uploaded file preview'}
              containerClassname={s.photo}
              height={PREVIEW_DIMENSION}
              src={file.src}
              variant={'round'}
              width={PREVIEW_DIMENSION}
            />
          </div>
          <div className={'flex w-full justify-end'}>
            <Button onClick={handleSaveClick} variant={'primary'}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
