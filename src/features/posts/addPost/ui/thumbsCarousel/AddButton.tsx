import { useRef } from 'react'
import { toast } from 'react-toastify'

import { validateFile } from '@/features/posts/addPost/lib/validateFile'
import { PlusCircle } from '@/shared/assets/icons/Plus'
import { useAppSelector } from '@/shared/config/storeHooks'
import { readFile } from '@/shared/lib'
import { Nullable } from '@/shared/types'
import { Button, Dropzone, DropzoneRef } from '@/shared/ui'

import s from './ThumbsCarousel.module.scss'

import { MAX_FILES_LENGTH } from '../../const/consts'
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
      const validationError = validateFile(fileArray[i])

      if (validationError !== null) {
        toast.error(validationError)

        return
      }

      const data = await readFile(fileArray[i])

      readFiles = [...readFiles, { filter: data, image: data, orig: data }]
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
