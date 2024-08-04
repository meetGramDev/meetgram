import { useMediaQuery } from 'react-responsive'

import { List } from '../model/types/postsList'
import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

export const PostsList = ({ images }: List) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  return (
    <>{isMobile ? <PostsListMobile images={images} /> : <PostsListDesktop images={images} />}</>
  )
}
