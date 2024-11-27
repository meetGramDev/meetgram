import { FollowersProps } from '../ui/FollowersView'

type FormatTitleReturnType = 'Followers' | 'Following'

export function formatTitle(title: FollowersProps['type']): FormatTitleReturnType {
  return (title.slice(0, 1).toUpperCase() + title.slice(1)) as FormatTitleReturnType
}
