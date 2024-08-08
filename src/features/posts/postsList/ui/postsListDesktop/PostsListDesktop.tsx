import { Post } from '@/entities/post/ui/Post'

import s from './PostsList.module.scss'

import { List } from '../../model/types/postsList'

export const PostsListDesktop = ({ images }: List) => {
  return (
    <div className={s.postsList}>
      {images.map(image => (
        <div className={s.item} key={image.id}>
          <Post
            alt={image.alt}
            className={s.image}
            height={image.height}
            src={image.src}
            width={image.width}
          />
        </div>
      ))}
    </div>
  )
}
