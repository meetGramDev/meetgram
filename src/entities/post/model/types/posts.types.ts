export type ImageType = {
  createdAt?: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PublicPost = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: ImageType[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}

export type GetPublicPostsResponse = {
  items: PublicPost[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type GerPublicPostsRequest = {
  endCursorPostId?: number
  id: string
  params: {
    pageSize?: number
  }
}
