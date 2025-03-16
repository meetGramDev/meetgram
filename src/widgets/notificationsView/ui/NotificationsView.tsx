import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { NotificationsCount } from '@/entities/notification'
import {
  useDeleteNotificationByIdMutation,
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/entities/notification/model/service/notificationsAPI.service'
import { NotificationType } from '@/entities/notification/model/types/service.types'
import { Notification } from '@/shared/assets/icons/Notification'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useInfiniteScroll } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Dropdown from '@/shared/ui/dropdown/dropdown'
import { PAGE_SIZE } from '@/widgets/postsList'
import { io } from 'socket.io-client'

// for sorting and filtered notifications data
const sortingData = (arr: NotificationType[]) => {
  const newArr = arr.map(item => ({ ...item }))

  newArr.sort((a, b) => {
    if (a.id > b.id) {
      return -1
    } else if (a.id == b.id) {
      return 0
    } else if (a.id < b.id) {
      return 1
    } else {
      return 0
    }
  })

  const newNewArr = newArr.filter((item, count) => item?.id !== newArr[count + 1]?.id)

  return newNewArr
}

export const NotificationsView = () => {
  //websocket
  const token = useAppSelector(state => state.user.accessToken)

  const queryParams = {
    query: {
      accessToken: token,
    },
  }

  useEffect(() => {
    if (queryParams.query.accessToken) {
      const socket = io('https://inctagram.work', queryParams)
      const notify = (message: string) => toast.success(message)

      socket.on('notifications', (message: any) => {
        notify(message.message)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [queryParams.query.accessToken])

  //notifications
  const [endCursorNotificationId, setEndCursorNotificationId] = useState<number | undefined>(
    undefined
  )

  const { data: notificationsData } = useGetUserNotificationsQuery({
    cursor: endCursorNotificationId,
    // isRead: false,
    // pageSize: 140,
    sortBy: 'notifyAt',
    sortDirection: 'asc',
  })

  const [markOfNotification] = useMarkNotificationAsReadMutation()

  const [deleteNotification] = useDeleteNotificationByIdMutation()

  //const sortedData = notificationsData && sortingData(notificationsData?.items)

  // const newNotificationsData = { ...notificationsData, items: sortedData }
  // const notificationId = sortedData?.map(item => {
  //   return item.id
  // })

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

  // const { ref } = useInfiniteScroll(
  //   () => {
  //     if (
  //       newNotificationsData &&
  //       newNotificationsData?.items &&
  //       newNotificationsData.items.length >= PAGE_SIZE &&
  //       newNotificationsData.items.length !== newNotificationsData.totalCount
  //     ) {
  //       setEndCursorNotificationId(newNotificationsData?.items.at(-1)?.id)
  //     }
  //   },
  //   {
  //     root: lastUserRef.current,
  //     threshold: 0.9,
  //   }
  // )

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
      {/*{newNotificationsData && (*/}
      {/*  <Dropdown*/}
      {/*    header={'Уведомления'}*/}
      {/*    isOpen={openDropdown}*/}
      {/*    onSelect={option => {}}*/}
      {/*    onToggle={onChangeOpenNotifications}*/}
      {/*    options={newNotificationsData?.items || []}*/}
      {/*    ref={ref}*/}
      {/*    setEndCursor={setEndCursorNotificationId}*/}
      {/*    totalCount={newNotificationsData?.totalCount}*/}
      {/*  >*/}
      {/*    <Button variant={'text'}>*/}
      {/*      <div className={'relative text-light-100'}>*/}
      {/*        <Notification*/}
      {/*          className={'fill-current transition-all duration-300 hover:fill-accent-500'}*/}
      {/*        />*/}

      {/*        {notificationsData?.notReadCount !== 0 &&*/}
      {/*          notificationsData?.notReadCount !== undefined &&*/}
      {/*          NotificationsCount(notificationsData.notReadCount)}*/}
      {/*      </div>*/}
      {/*    </Button>*/}
      {/*  </Dropdown>*/}
      {/*)}*/}
      {notificationsData && (
        <Dropdown
          deleteNotification={deleteNotificationHandler}
          header={'Уведомления'}
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
