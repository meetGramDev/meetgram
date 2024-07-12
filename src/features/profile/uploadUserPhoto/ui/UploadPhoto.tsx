import { useState } from 'react'

import { useDeletePhotoMutation, useUploadPhotoMutation } from '@/entities/photo'

import { UploadPhotoForm } from './UploadPhotoForm'

export const UploadPhoto = () => {
  const [upload] = useUploadPhotoMutation()
  const [remove] = useDeletePhotoMutation()
  const [success, setSuccess] = useState('')

  const handleUploadPhoto = (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    console.log('Click Save btn', formData.get('file'))

    setSuccess('Uploaded successfully!')
  }

  return <UploadPhotoForm onSend={handleUploadPhoto} onSuccessMessage={success} />
}
