import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { useDeletePostMutation } from '@/entities/post'
import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { CopyLinkIcon } from '@/shared/assets/icons/CopyLink'
import { EditIcon } from '@/shared/assets/icons/Edit'
import { FollowIcon } from '@/shared/assets/icons/Follow'
import { MoreIcon } from '@/shared/assets/icons/More'
import { UnfollowIcon } from '@/shared/assets/icons/Unfollow'
import { Wastebasket } from '@/shared/assets/icons/Wastebasket'
import { HOME } from '@/shared/config/router'
import { Button, Dialog, Select } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './PostViewSelect.module.scss'

type Props = {
  disableFollow?: boolean
  id?: string
  isFollowing?: boolean
  onEdit?: () => void
  onFollow?: (userId: number) => void
  onOpenPost: (open: boolean) => void
  ownerId: number
  userId: number
}

export const PostViewSelect = memo(
  ({ disableFollow, id, isFollowing, onEdit, onFollow, onOpenPost, ownerId, userId }: Props) => {
    const router = useRouter()
    const [deletePost, { isSuccess }] = useDeletePostMutation()
    const isOwner = ownerId === userId

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openSelect, setOpenSelect] = useState(false)

    const handleOnFollow = () => onFollow?.(ownerId)

    return (
      <div>
        <Select
          contentClassName={s.selectContent}
          onOpenChange={setOpenSelect}
          open={openSelect}
          placeholder={<MoreIcon />}
          rootClassName={s.selectTrigger}
          showArrow={false}
        >
          {openModal && (
            <Dialog onOpenChange={setOpenModal} open={openModal} title={'Delete Post'}>
              <ConfirmClosingDialog
                message={'Are you sure you want to delete this post?'}
                onConfirm={(isConfirm: boolean) => {
                  if (isConfirm) {
                    deletePost({ postId: id ?? '' }).then(() => {
                      setOpenModal(false)
                      onOpenPost(false)
                      router.push(`${HOME}/${userId}`)
                    })
                  } else {
                    setOpenModal(false)
                  }
                }}
              />
              {/*<div className={s.dialogChildrenWrapper}>*/}
              {/*  <span className={s.dialogText}>{`Are you sure you want to*/}
              {/*delete this post?`}</span>*/}
              {/*  <div className={s.dialogBtnWrap}>*/}
              {/*    <Button*/}
              {/*      className={clsx(s.dialogButton, s.dialogButtonComplete)}*/}
              {/*      onClick={() => {*/}
              {/*        deletePost({ postId: id ?? '' })*/}
              {/*        if (isSuccess) {*/}
              {/*          setOpenModal(false)*/}
              {/*          onOpenPost(false)*/}
              {/*          router.push(`${HOME}/${userId}`)*/}
              {/*        }*/}
              {/*      }}*/}
              {/*      variant={'outlined'}*/}
              {/*    >*/}
              {/*      Yes*/}
              {/*    </Button>*/}
              {/*    <Button*/}
              {/*      className={s.dialogButton}*/}
              {/*      onClick={() => setOpenModal(false)}*/}
              {/*      variant={'primary'}*/}
              {/*    >*/}
              {/*      No*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </Dialog>
          )}
          {isOwner ? (
            <div className={s.menuContent}>
              <Button className={s.button} onClick={onEdit} variant={'text'}>
                <EditIcon /> Edit Post
              </Button>
              <Button className={s.button} onClick={() => setOpenModal(true)} variant={'text'}>
                <Wastebasket /> Delete Post
              </Button>
            </div>
          ) : (
            <div className={s.menuContent}>
              {isFollowing !== undefined && (
                <>
                  {isFollowing ? (
                    <Button
                      className={s.button}
                      disabled={disableFollow}
                      onClick={handleOnFollow}
                      variant={'text'}
                    >
                      <UnfollowIcon /> Unfollow
                    </Button>
                  ) : (
                    <Button
                      className={s.button}
                      disabled={disableFollow}
                      onClick={handleOnFollow}
                      variant={'text'}
                    >
                      <FollowIcon /> Follow
                    </Button>
                  )}
                </>
              )}
              <Button
                className={s.button}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setOpenSelect(false)
                  toast.info('Copied!', { autoClose: 1000 })
                }}
                variant={'text'}
              >
                <CopyLinkIcon /> Copy Link
              </Button>
            </div>
          )}
        </Select>
      </div>
    )
  }
)

PostViewSelect.displayName = 'PostViewSelect'
