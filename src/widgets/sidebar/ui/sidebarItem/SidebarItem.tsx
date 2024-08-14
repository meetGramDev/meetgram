import { FC, SVGProps } from 'react'
import { useDispatch } from 'react-redux'

import { setOpenModal } from '@/features/profile/addPost'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
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
  const dispatch = useDispatch()
  const router = useRouter()
  const userId = useAppSelector(state => state.user.accountData.userId)

  const handleClickCreatePost = async () => {
    await router.push(`${HOME}/${userId}`)
    dispatch(setOpenModal(true))
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
