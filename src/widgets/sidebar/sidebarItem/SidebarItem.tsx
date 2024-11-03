import { FC, SVGProps } from 'react'
import { useMediaQuery } from 'react-responsive'

import { addPostActions } from '@/features/posts/addPost'
import { HOME } from '@/shared/config/router'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import clsx from 'clsx'
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
  className?: string
  item: SidebarItemType
}

export const SidebarItem = ({ className, item }: Props) => {
  const { setOpenAddingPost } = useActions(addPostActions)
  const router = useRouter()
  const userId = useAppSelector(state => state.user.accountData.userId)

  const handleClickCreatePost = () => {
    if (router.asPath === `${HOME}/${userId}`) {
      setOpenAddingPost(true)
    }
  }
  const isMobile = useMediaQuery({ query: '(max-width:650px)' })

  return (
    <>
      {item.isCreatePost ? (
        <Button
          className={clsx(s.createPostButton, className)}
          onClick={handleClickCreatePost}
          variant={'text'}
        >
          <item.Svg />
          {isMobile || item.name}
        </Button>
      ) : (
        <Link className={clsx(s.item, className)} href={item.path} key={item.path} passHref>
          <item.Svg />
          {isMobile || item.name}
        </Link>
      )}
    </>
  )
}
