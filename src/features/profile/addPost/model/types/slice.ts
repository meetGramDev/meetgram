export type ImageType = {
  image: string // Base64
  orig: string
}

export type UpdateImagePayload = {
  image: Partial<ImageType>
  index: number
}
