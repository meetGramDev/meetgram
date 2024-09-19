export type ImageType = {
  image: string // Base64
}

export type UpdateImagePayload = {
  image: ImageType
  index: number
}
