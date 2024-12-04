import { FC, SVGProps, useState } from 'react'
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
  currentItem?: null | number
  id?: number
  item: SidebarItemType
  setCurrentItem?: (id: null | number) => void
}

export const SidebarItem = ({ className, currentItem, id, item, setCurrentItem }: Props) => {
  const { setOpenAddingPost } = useActions(addPostActions)
  const router = useRouter()
  const userId = useAppSelector(state => state.user.accountData.userId)
  const isMobile = useMediaQuery({ query: '(max-width:650px)' })
  const isActiveLink =
    id !== undefined &&
    currentItem === id &&
    userId !== null &&
    router.asPath.includes(String(userId))

  const handleClickCreatePost = () => {
    if (router.asPath === `${HOME}/${userId}`) {
      setOpenAddingPost(true)
    }
  }

  const currentLinkHandler = () => {
    if (currentItem !== id && setCurrentItem !== undefined && id !== undefined) {
      setCurrentItem(id)
    }
  }

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
        <Link
          className={clsx(s.item, className, s.link, isActiveLink && s.currentItem)}
          href={item.path}
          key={item.path}
          onClick={currentLinkHandler}
          passHref
        >
          <item.Svg />
          {isMobile || item.name}
        </Link>
      )}
    </>
  )
}
