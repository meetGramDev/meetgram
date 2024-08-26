import React, { useEffect, useRef, useState } from 'react'

import { Post } from '@/entities/post'
import { PostView } from '@/entities/post/postView'
import { PublicPost } from '@/features/profile/addPost'
import { clsx } from 'clsx'

import s from './PostsListMobile.module.scss'

type Props = {
  posts: PublicPost[]
}

export const PostsListMobile = ({ posts }: Props) => {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const handleTouch = (index: number) => {
    setSelectedImageIndex(index)
    setShowGallery(true)
  }
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<PublicPost | null>(null)

  useEffect(() => {
    if (selectedImageIndex ?? itemRefs.current[selectedImageIndex]) {
      itemRefs.current[selectedImageIndex]?.scrollIntoView({ block: 'center' })
    }
  }, [selectedImageIndex])

  return (
    <div className={s.container}>
      <div className={clsx(s.postsList, showGallery && s.tape)}>
        {posts?.map((post, index) => (
          <div
            className={clsx(s.item, showGallery && s.tapeItem)}
            key={post.id}
            onClick={() => handleTouch(index)}
            ref={el => {
              itemRefs.current[index] = el
            }}
          >
            <Post
              alt={'post'}
              className={s.image}
              height={post.images[0].height}
              src={post.images[0].url}
              width={post.images[0].width}
            />
          </div>
        ))}
        {currentPost && (
          <PostView
            avatarOwner={currentPost.avatarOwner}
            isFollowing={false}
            isOpen={setOpenPost}
            open={openPost}
            ownerId={currentPost.ownerId}
            post={{
              alt: 'post',
              className: s.image,
              src: currentPost.images[0].url,
            }}
            postCreate={new Date()}
            postId={currentPost.id}
            postLikesCount={currentPost.likesCount}
            userId={currentPost.ownerId}
            userName={currentPost.userName}
          />
        )}
      </div>
    </div>
  )
}
