import { CommentsType } from '../model/types/commentsType'
import { Comment } from './Comment'

type Props = {
  comments: CommentsType
  onClick: (commentId: number) => void
}

export const Comments = ({ comments, onClick }: Props) => {
  return (
    <>
      {comments.items &&
        comments.items.map(comment => (
          <div key={comment.id}>
            <Comment comment={comment} onClick={onClick} />
          </div>
        ))}
    </>
  )
}
