import { useEffect, useRef, useState } from 'react'

import { Photo } from '@/entities/photo'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { readFile } from '@/shared/lib'
import { Nullable } from '@/shared/types'
import { Button, Dropzone, DropzoneRef } from '@/shared/ui'

import s from './AddImages.module.scss'

import { addImage, setAddingPostStage } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'

export const AddImages = () => {
  const dropzoneRef = useRef<Nullable<DropzoneRef>>(null)

  const dispatch = useAppDispatch()

  const [file, setFile] = useState<File | null>()

  const resetState = () => {
    setFile(null)
  }

  const handleSelectFileClick = () => {
    resetState()
    dropzoneRef.current?.onSelectFile()
  }

  const handleFileSelect = (file: File) => {
    resetState()
    setFile(file)
  }

  const handleNextView = async () => {
    if (file) {
      const data = await readFile(file)

      dispatch(addImage({ data, image: URL.createObjectURL(file) }))
      dispatch(setAddingPostStage(AddingPostStage.DESCRIPTION))
    }
  }

  useEffect(() => {
    if (file) {
      handleNextView()
    }
  }, [file])

  return (
    <div className={s.content}>
      <Dropzone className={s.photo} onFileSelect={handleFileSelect} ref={dropzoneRef}>
        <Photo type={'empty'} variant={'square'} />
      </Dropzone>
      <Button className={s.button} onClick={handleSelectFileClick} variant={'primary'}>
        Select from computer
      </Button>
    </div>
  )
}
