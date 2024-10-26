import { ReactElement } from 'react'

import { ALLOWED_TYPES } from '@/shared/const/consts'
import { isImgFileTypeValid } from '@/shared/lib'

import { TypeValidateFileTranslate } from '../../../../../public/locales/en'
import { MAX_FILE_SIZE, MIN_FILE_SIZE } from '../const/consts'

export function validateFile(
  file: File,
  t: TypeValidateFileTranslate
): ReactElement | null | string {
  if (!isImgFileTypeValid(file, ALLOWED_TYPES)) {
    return (
      <p>
        {t['Invalid file type. Failed to upload']} <span className={'font-bold'}>{file.name}</span>
      </p>
    )
  }

  if (file.size < MIN_FILE_SIZE.bytes) {
    return `${t['File must be at least']} ${MIN_FILE_SIZE.size} KB`
  }

  if (file.size > MAX_FILE_SIZE.bytes) {
    return `${t["The image size mustn't exceed"]} ${MAX_FILE_SIZE.size} MB`
  }

  return null
}
