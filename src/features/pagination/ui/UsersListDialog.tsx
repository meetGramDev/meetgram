import { UserWhoLikedPost, useGetWhoLikedPostQuery } from '@/entities/like'
import { UserLink } from '@/entities/user'
import { Button, Loader } from '@/shared/ui'

import s from './UsersListDialog.module.scss'

type Props = {
  data?: UserWhoLikedPost[]
  onFollow?: (id: number) => void
  postId: number
}

export const UsersListDialog = ({ onFollow, postId }: Props) => {
  const { data, isSuccess } = useGetWhoLikedPostQuery({ postId })

  if (!isSuccess) {
    return <Loader />
  }

  return (
    <ul className={s.list}>
      {data.items.map(item => (
        <li className={'flex w-full items-center'} key={item.userId}>
          <UserLink avatars={item.avatars} userId={item.userId} userName={item.userName} />

          <div className={'ml-auto'}>
            <Button
              className={s.followBtn}
              onClick={() => onFollow?.(item.id)}
              variant={item.isFollowing ? 'outlined' : 'primary'}
            >
              {item.isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
