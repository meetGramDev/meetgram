export interface Avatar {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UploadPhotoResponseType = {
  avatars: Avatar[]
}
