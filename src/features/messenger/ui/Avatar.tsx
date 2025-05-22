import { Photo } from '@/entities/photo'

import notPhoto from '../../../shared/assets/img/not-photo-user.jpg'

export type AvatarProps = {
  avatar?: { alt?: string; src?: string }
  size?: number
}

export const Avatar = ({ avatar, size }: AvatarProps) => {
  return (
    <Photo
      alt={avatar?.alt || 'user avatar'}
      height={size || 48}
      src={avatar?.src || notPhoto}
      width={size || 48}
    />
  )
}
