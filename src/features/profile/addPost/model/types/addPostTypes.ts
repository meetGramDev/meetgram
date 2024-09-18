import { ImageType } from '@/entities/post'

export enum AddPostStage {
  ADD = 'Add Photo',
  CROPPING = 'Cropping',
  DESCRIPTION = 'Description',
  FILTERS = 'Filters',
}

export type UploadImageResponse = {
  images: ImageType[]
}

export type CreatePost = {
  childrenMetadata: [{ uploadId: string }]
  description: string
}
