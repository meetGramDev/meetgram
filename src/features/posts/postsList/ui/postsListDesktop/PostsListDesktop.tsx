import { Post } from '@/entities/post/ui/Post'
import { PublicPost } from '@/features/profile/addPost'

import s from './PostsList.module.scss'

type Props = {
  posts: PublicPost[]
}

export const PostsListDesktop = ({ posts }: Props) => {
  return (
    <div className={s.postsList}>
      {posts?.map(post => (
        <div className={s.item} key={post.id}>
          <Post
            alt={'post'}
            className={s.image}
            height={post.images[0].height}
            src={post.images[0].url}
            width={post.images[0].width}
          />
        </div>
      ))}
    </div>
  )
}
