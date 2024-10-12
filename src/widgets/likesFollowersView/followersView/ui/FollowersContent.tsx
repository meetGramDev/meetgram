import { useRef, useState } from 'react'

import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import {
  useDeleteFollowerMutation,
  useFollowUserMutation,
  useGetUserFollowingOrFollowersQuery,
} from '@/features/follow'
import { UsersListDialog } from '@/features/pagination'
import { Dialog, Loader } from '@/shared/ui'

import s from './FollowersView.module.scss'

import { ContainerWithSearch } from '../../ui/ContainerWithSearch'
import { FollowersProps } from './FollowersView'

const MAX_PAGE_SIZE = 8

export const FollowersContent = ({ followCount, type, userName }: FollowersProps) => {
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const { data, isFetching, isLoading, isSuccess } = useGetUserFollowingOrFollowersQuery({
    cursor: endCursorId,
    isGetFollowers: type === 'followers',
    pageSize: MAX_PAGE_SIZE,
    userName,
  })

  const [follow, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [deleteFollower, { isLoading: isDeleteFollowerLoading }] = useDeleteFollowerMutation()
  const [openConfirm, setOpenConfirm] = useState(false)
  const deleteUser = useRef<{ id: string; userName: string }>({ id: '', userName: '' })

  const handleFollowUser = (userId: number) => follow({ selectedUserId: userId })

  const handleOnDeleteFollower = (userId: number, userName?: string) => {
    setOpenConfirm(true)
    deleteUser.current.id = String(userId)
    deleteUser.current.userName = userName || ''
  }

  const handleOnConfirm = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteFollower(deleteUser.current.id)
      setOpenConfirm(false)
    } else {
      setOpenConfirm(false)
    }
  }

  return (
    <>
      {!isSuccess ? (
        <div className={'flex items-center justify-center p-12'}>
          <Loader />
        </div>
      ) : (
        <ContainerWithSearch className={s.container}>
          <UsersListDialog
            data={data}
            disabled={isFollowLoading || isDeleteFollowerLoading}
            endCursor={endCursorId}
            isFetching={isFetching}
            isLoading={isLoading}
            isSuccess={isSuccess}
            maxPageSize={MAX_PAGE_SIZE}
            onFollow={handleFollowUser}
            setEndCursor={setEndCursorId}
            totalCount={followCount}
            {...(type === 'followers' ? { onDeleteFollowers: handleOnDeleteFollower } : {})}
          />
        </ContainerWithSearch>
      )}

      {openConfirm && (
        <Dialog onOpenChange={setOpenConfirm} open={openConfirm} title={'Delete following'}>
          <ConfirmClosingDialog
            message={`Do you really want to delete a following "${deleteUser.current.userName}"?`}
            onConfirm={handleOnConfirm}
          />
        </Dialog>
      )}
    </>
  )
}
