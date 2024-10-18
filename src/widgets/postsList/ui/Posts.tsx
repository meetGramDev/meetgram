import { forwardRef } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'
import { type PostListProps } from './props.type'

export const Posts = forwardRef<HTMLDivElement, PostListProps>((props, ref) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  return (
    <>
      {isMobile ? (
        <PostsListMobile ref={ref} {...props} />
      ) : (
        <PostsListDesktop ref={ref} {...props} />
      )}
    </>
  )
})
