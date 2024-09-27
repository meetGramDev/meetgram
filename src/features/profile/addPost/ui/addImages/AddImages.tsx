import { ReactElement, useRef, useState } from 'react'

import { Photo } from '@/entities/photo'
import { UploadMessage } from '@/shared/components/dialog'
import { useActions } from '@/shared/config/storeHooks'
import { ALLOWED_TYPES } from '@/shared/const/consts'
import { isImgFileTypeValid, readFile, sleep } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Nullable } from '@/shared/types'
import { Button, Dropzone, DropzoneRef, Loader } from '@/shared/ui'

import s from './AddImages.module.scss'

import { MAX_FILE_SIZE, MAX_FILES_LENGTH } from '../../const/consts'
import { addPostActions } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'
import { ImageType } from '../../model/types/slice'

export const AddImages = () => {
  const t = useTranslate()
  const dropzoneRef = useRef<Nullable<DropzoneRef>>(null)

  const { setAddingPostStage, startEditing } = useActions(addPostActions)

  const [error, setError] = useState<ReactElement | string>('')
  const [loading, setLoading] = useState(false)

  const resetState = () => {
    setError('')
  }

  const handleSelectFileClick = () => {
    resetState()
    dropzoneRef.current?.onSelectFile()
  }

  const handleNextView = (files: ImageType[]) => {
    if (!files || error) {
      return
    }

    startEditing(files)
    setAddingPostStage(AddingPostStage.CROPPING)
  }

  const handleFilesSelect = async (files: FileList) => {
    resetState()
    setLoading(true)

    let fileArray = Array.from(files)

    if (fileArray.length > MAX_FILES_LENGTH) {
      fileArray = fileArray.slice(0, MAX_FILES_LENGTH)
    }

    let readFiles: ImageType[] = []

    for (let i = 0; i < fileArray.length; i++) {
      if (!isImgFileTypeValid(fileArray[i], ALLOWED_TYPES)) {
        setError(
          <p>
            Invalid file type. Failed to upload{' '}
            <span className={'font-bold'}>{fileArray[i].name}</span>
          </p>
        )

        setLoading(false)

        return
      }

      if (fileArray[i].size < 1024) {
        setError('File must be at least 1 KB')

        setLoading(false)

        return
      }

      if (fileArray[i].size > MAX_FILE_SIZE.bytes) {
        setError(`The image size mustn't exceed ${MAX_FILE_SIZE.size} MB`)

        setLoading(false)

        return
      }

      const data = await readFile(fileArray[i])

      readFiles = [...readFiles, { image: data, orig: data }]
    }

    await sleep(1200)
    setLoading(false)

    handleNextView(readFiles)
  }

  return (
    <div className={s.content}>
      <div className={'px-5'}>
        {loading && (
          <div className={'mx-28 my-36'}>
            <Loader />
          </div>
        )}
        {!loading && (
          <>
            {error && (
              <div className={'my-7'}>
                <UploadMessage message={error} type={'error'} />
              </div>
            )}
            {!error && <p className={s.dropdownMessage}>Перетащите сюда фото</p>}
            <Dropzone
              className={s.photo}
              multiple
              onFileListSelect={handleFilesSelect}
              ref={dropzoneRef}
            >
              <Photo type={'empty'} variant={'square'} />
            </Dropzone>
          </>
        )}
      </div>
      <Button
        className={s.button}
        disabled={loading}
        onClick={handleSelectFileClick}
        variant={'primary'}
      >
        {t('Select from computer') as string}
      </Button>
    </div>
  )
}
