import { NotificationType } from '@/entities/notification/model/types/service.types'
import { getTimeAgo } from '@/features/posts/comments'

// export type NotificationProps = {
//   message: string
//   id: number
//   createdAt: string
// }

export const Notification = ({ createdAt, id, isRead, message, notifyAt }: NotificationType) => {
  return (
    <div>
      <>
        <h4>Новое уведомление!</h4>
        {isRead && <p>Новое</p>}
      </>

      <p>{message}</p>
      {getTimeAgo('en', createdAt)}
    </div>
  )
}
