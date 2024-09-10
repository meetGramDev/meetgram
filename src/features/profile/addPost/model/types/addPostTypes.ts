import { ImageType } from '@/entities/post'

export enum PostView {
  CROPPING = 'CROPPING',
  DESCRIPTION = 'DESCRIPTION',
  FILTERS = 'FILTERS',
  IMAGE = 'IMAGE',
}

export type UploadImageResponse = {
  images: ImageType[]
}

export type CreatePost = {
  childrenMetadata: [{ uploadId: string }]
  description: string
}
