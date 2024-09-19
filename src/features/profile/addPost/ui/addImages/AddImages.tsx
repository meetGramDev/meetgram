import { ReactElement, useRef, useState } from 'react'

import { Photo } from '@/entities/photo'
import { UploadMessage } from '@/shared/components/dialog'
import { useActions } from '@/shared/config/storeHooks'
import { isImgFileTypeValid, readFile } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Nullable } from '@/shared/types'
import { Button, Dropzone, DropzoneRef } from '@/shared/ui'

import s from './AddImages.module.scss'

import { addPostActions } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'

export const ALLOWED_TYPES = ['image/jpg', 'image/png', 'image/jpeg', 'image/heic', 'image/heif']

export const AddImages = () => {
  const t = useTranslate()
  const dropzoneRef = useRef<Nullable<DropzoneRef>>(null)

  const { addImage, setAddingPostStage } = useActions(addPostActions)

  const [error, setError] = useState<ReactElement | string>('')

  const resetState = () => {
    setError('')
  }

  const handleSelectFileClick = () => {
    resetState()
    dropzoneRef.current?.onSelectFile()
  }

  const handleNextView = async (file: File) => {
    const data = await readFile(file)

    addImage({ data, image: URL.createObjectURL(file) })
    setAddingPostStage(AddingPostStage.CROPPING)
  }

  const handleFileSelect = (file: File) => {
    resetState()

    if (!isImgFileTypeValid(file, ALLOWED_TYPES)) {
      setError(
        <p>
          Invalid file type. Failed to upload <span className={'font-bold'}>{file.name}</span>
        </p>
      )

      return
    }

    if (!file || error) {
      return
    }

    handleNextView(file)
  }

  return (
    <div className={s.content}>
      <div className={'px-5'}>
        {error && (
          <div className={'my-7'}>
            <UploadMessage message={error} type={'error'} />
          </div>
        )}

        {!error && <p className={s.dropdownMessage}>Перетащите сюда фото</p>}
        <Dropzone className={s.photo} onFileSelect={handleFileSelect} ref={dropzoneRef}>
          <Photo type={'empty'} variant={'square'} />
        </Dropzone>
      </div>
      <Button className={s.button} onClick={handleSelectFileClick} variant={'primary'}>
        {t('Select from computer') as string}
      </Button>
    </div>
  )
}
