import { useRef, useState } from 'react'

import { NotificationsCount } from '@/entities/notification'
import {
  useDeleteNotificationByIdMutation,
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/entities/notification/model/service/notificationsAPI.service'
import { Notification } from '@/shared/assets/icons/Notification'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useInfiniteScroll, useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Dropdown from '@/shared/ui/dropdown/dropdown'
import { useConnectSocket } from '@/widgets/notificationsView/lib/useConnectSocket'
import { PAGE_SIZE } from '@/widgets/postsList'

export const NotificationsView = () => {
  const t = useTranslate()
  //websocket
  // const token = useAppSelector(state => state.user.accessToken)
  //
  // useConnectSocket(token)

  //notifications
  const [endCursorNotificationId, setEndCursorNotificationId] = useState<number | undefined>(
    undefined
  )

  const { data: notificationsData } = useGetUserNotificationsQuery({
    cursor: endCursorNotificationId,
    // isRead: false,
    pageSize: 10,
    sortBy: 'id',
    sortDirection: 'desc',
  })

  console.log(endCursorNotificationId)

  const [markOfNotification] = useMarkNotificationAsReadMutation()

  const [deleteNotification] = useDeleteNotificationByIdMutation()

  const notificationId = notificationsData?.items?.map(item => {
    return item.id
  })

  const [openDropdown, setOpenDropdown] = useState(false)

  const onChangeOpenNotifications = (isDropdownOpen: boolean) => {
    if (isDropdownOpen === openDropdown) {
      return
    }

    if (isDropdownOpen) {
      setOpenDropdown(true)
    } else {
      setOpenDropdown(false)
      markOfNotification({ ids: notificationId || [] })
    }
  }

  const lastUserRef = useRef<HTMLElement>(null)

  const deleteNotificationHandler = (id: number) => {
    deleteNotification({ id })
  }

  const { ref } = useInfiniteScroll(
    () => {
      if (
        notificationsData &&
        notificationsData?.items &&
        notificationsData.items.length >= PAGE_SIZE &&
        notificationsData.items.length !== notificationsData.totalCount
      ) {
        setEndCursorNotificationId(notificationsData?.items.at(-1)?.id)
      }
    },
    {
      root: lastUserRef.current,
      threshold: 0.9,
    }
  )

  return (
    <>
      {notificationsData && (
        <Dropdown
          deleteNotification={deleteNotificationHandler}
          header={t('Notifications')}
          isOpen={openDropdown}
          onSelect={option => {}}
          onToggle={onChangeOpenNotifications}
          options={notificationsData?.items || []}
          ref={ref}
          setEndCursor={setEndCursorNotificationId}
          totalCount={notificationsData?.totalCount}
        >
          <Button variant={'text'}>
            <div className={'relative text-light-100'}>
              <Notification
                className={'fill-current transition-all duration-300 hover:fill-accent-500'}
              />

              {notificationsData?.notReadCount !== 0 &&
                notificationsData?.notReadCount !== undefined &&
                NotificationsCount(notificationsData.notReadCount)}
            </div>
          </Button>
        </Dropdown>
      )}
    </>
  )
}
