import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetPostCommentsQuery } from '@/entities/post/model/services/post.service'
import { Loader } from '@/shared/ui'

import { Comment } from './Comment'

type Props = {
  onClick: (commentId: number) => void
  pageNumber: number
  postId: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

export const Comments = ({ onClick, pageNumber, postId, setPageNumber }: Props) => {
  const pageSize = 10

  const { data, isFetching } = useGetPostCommentsQuery({ pageNumber, pageSize, postId })
  const [hasMore, setHasMore] = useState(true)
  const { inView, ref } = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView && !isFetching && hasMore) {
      setPageNumber(prevPage => prevPage + 1)
    }
  }, [inView, isFetching, hasMore, setPageNumber])

  useEffect(() => {
    if (data?.items) {
      if (data.items.length === data.totalCount) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    }
  }, [data?.items, isFetching, data?.totalCount])

  return (
    <>
      {data?.items.map(comment => (
        <div key={comment.id}>
          <Comment comment={comment} onClick={onClick} />
        </div>
      ))}
      {isFetching && (
        <div className={'flex h-1/4 w-full items-center justify-center'}>
          <Loader />
        </div>
      )}
      <div ref={ref} style={{ height: '1px' }}></div>
    </>
  )
}
