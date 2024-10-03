import { FC, SVGProps } from 'react'

import { addPostActions } from '@/features/posts/addPost'
import { HOME } from '@/shared/config/router'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SidebarItem.module.scss'

export type SidebarItemType = {
  Svg: FC<SVGProps<SVGSVGElement>>
  isCreatePost?: boolean
  name: string
  path: string
}

type Props = {
  item: SidebarItemType
}

export const SidebarItem = ({ item }: Props) => {
  const { setOpenAddingPost } = useActions(addPostActions)
  const router = useRouter()
  const userId = useAppSelector(state => state.user.accountData.userId)

  const handleClickCreatePost = () => {
    if (router.asPath === `${HOME}/${userId}`) {
      setOpenAddingPost(true)
    }
  }

  return (
    <>
      {item.isCreatePost ? (
        <Button className={s.createPostButton} onClick={handleClickCreatePost} variant={'text'}>
          <item.Svg />
          {item.name}
        </Button>
      ) : (
        <Link className={s.item} href={item.path} key={item.path} passHref>
          <item.Svg />
          {item.name}
        </Link>
      )}
    </>
  )
}
