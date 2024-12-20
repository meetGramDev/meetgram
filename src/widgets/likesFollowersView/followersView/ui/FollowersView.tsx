import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Dialog } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './FollowersView.module.scss'

import { formatTitle } from '../lib/formatTitle'
import { FollowersContent } from './FollowersContent'

export type FollowersProps = {
  followCount?: number
  type: 'followers' | 'following'
  userName: string
}

export const FollowersView = ({ followCount, type, userName }: FollowersProps) => {
  const t = useTranslate()
  const router = useRouter()
  const isOpen = router.query[type] as string | undefined
  const profileUrl = `/profile/${router.query.userId}`
  const shouldOpen = isOpen === '' && followCount !== 0

  const handleOpenDialog = (open: boolean) => {
    if (followCount === 0) {
      return
    }

    if (!open) {
      router.push(profileUrl, undefined, { shallow: true })
    } else {
      router.push(`${profileUrl}/?${type}`, undefined, {
        shallow: true,
      })
    }
  }

  return (
    <Dialog
      modal
      onOpenChange={handleOpenDialog}
      open={shouldOpen}
      title={t(formatTitle(type))}
      trigger={
        <Button className={s.triggerBtn} variant={'text'}>
          <span>{followCount || 0}</span>
          {t(formatTitle(type))}
        </Button>
      }
    >
      <FollowersContent followCount={followCount} type={type} userName={userName} />
    </Dialog>
  )
}
