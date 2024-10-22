import { GetPublicPostsArgs, GetPublicPostsResponse } from '@/entities/post'
import { BASE_URL } from '@/shared/api'
import axios, { AxiosError } from 'axios'

export async function getPublicPosts(params: GetPublicPostsArgs) {
  let postsUrl: string = `${BASE_URL}/public-posts/user`

  if (params.endCursorPostId) {
    postsUrl += `/${params.id}/${params.endCursorPostId}?pageSize=${params.params.pageSize}`
  } else {
    postsUrl += `/${params.id}?pageSize=${params.params.pageSize}`
  }

  try {
    const resp = await axios.get<GetPublicPostsResponse>(postsUrl)

    return resp.data
  } catch (error) {
    console.error('Error fetching posts: ', error as AxiosError)

    throw error as AxiosError
  }
}
