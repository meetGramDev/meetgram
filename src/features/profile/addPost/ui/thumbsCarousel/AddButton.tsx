import { useRef } from 'react'

import { PlusCircle } from '@/shared/assets/icons/Plus'
import { useAppSelector } from '@/shared/config/storeHooks'
import { ALLOWED_TYPES } from '@/shared/const/consts'
import { isImgFileTypeValid, readFile } from '@/shared/lib'
import { Nullable } from '@/shared/types'
import { Button, Dropzone, DropzoneRef } from '@/shared/ui'

import s from './ThumbsCarousel.module.scss'

import { MAX_FILE_SIZE, MAX_FILES_LENGTH } from '../../const/consts'
import { selectNumberOfImages } from '../../model/selectors/addPost.selectors'
import { ImageType } from '../../model/types/slice'

type Props = {
  onAdd: (files: ImageType[]) => void
}

export const AddButton = ({ onAdd }: Props) => {
  const dropzoneRef = useRef<Nullable<DropzoneRef>>(null)
  const currImgsNum = useAppSelector(selectNumberOfImages)

  const handleOnAddFiles = () => {
    dropzoneRef.current?.onSelectFile()
  }

  const handleFilesSelect = async (files: FileList) => {
    let fileArray = Array.from(files)

    const freeSlots = MAX_FILES_LENGTH - currImgsNum

    if (fileArray.length >= freeSlots) {
      fileArray = fileArray.slice(0, freeSlots)
    }

    let readFiles: ImageType[] = []

    for (let i = 0; i < fileArray.length; i++) {
      if (!isImgFileTypeValid(fileArray[i], ALLOWED_TYPES)) {
        return
      }

      if (fileArray[i].size < 1024) {
        return
      }

      if (fileArray[i].size > MAX_FILE_SIZE.bytes) {
        return
      }

      const data = await readFile(fileArray[i])

      readFiles = [...readFiles, { image: data, orig: data }]
    }

    onAdd(readFiles)
  }

  return (
    <div>
      <Button className={s.btnAdd} onClick={handleOnAddFiles} variant={'text'}>
        <PlusCircle />
        <Dropzone multiple onFileListSelect={handleFilesSelect} ref={dropzoneRef} />
      </Button>
    </div>
  )
}
