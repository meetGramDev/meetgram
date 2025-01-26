import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import {
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

const sortingData = (arr: NotificationType[]) => {
  const newArr = arr.map(item => ({ ...item }))

  newArr.sort((a, b) => {
    if (a.id > b.id) {
      return -1
    }
    if (a.id == b.id) {
      return 0
    }
    if (a.id < b.id) {
      return 1
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
    // pageSize: 12,
    sortBy: 'notifyAt',
    sortDirection: 'desc',
  })
  const [markOfNotification] = useMarkNotificationAsReadMutation()

  const sortedData = notificationsData && sortingData(notificationsData?.items)

  const newNotificationsData = { ...notificationsData, items: sortedData }
  const notificationId = sortedData?.map(item => {
    return item.id
  })

  console.log(notificationId)

  const [openDropdown, setOpenDropdown] = useState(false)

  const onChangeOpenNotifications = (isDropdownOpen: boolean) => {
    if (isDropdownOpen) {
      setOpenDropdown(true)
    } else {
      notificationId && markOfNotification({ ids: notificationId })

      setOpenDropdown(false)
    }
  }

  // const firstRenderSkipPagination = useRef(true)
  const lastUserRef = useRef<HTMLElement>(null)

  // const { ref } = useInfiniteScroll(
  //   () => {
  //     if (
  //       // !firstRenderSkipPagination.current &&
  //       notificationsData &&
  //       notificationsData?.items &&
  //       notificationsData.items.length >= PAGE_SIZE &&
  //       notificationsData.items.length !== notificationsData.totalCount
  //     ) {
  //       setEndCursorNotificationId(notificationsData?.items.at(-1)?.id)
  //     }
  //     // if (firstRenderSkipPagination.current) {
  //     //   firstRenderSkipPagination.current = false
  //     // }
  //   },
  //   {
  //     root: lastUserRef.current,
  //     threshold: 0.9,
  //   }
  // )

  const { ref } = useInfiniteScroll(
    () => {
      if (
        // !firstRenderSkipPagination.current &&
        newNotificationsData &&
        newNotificationsData?.items &&
        newNotificationsData.items.length >= PAGE_SIZE &&
        newNotificationsData.items.length !== newNotificationsData.totalCount
      ) {
        setEndCursorNotificationId(newNotificationsData?.items.at(-1)?.id)
      }
      // if (firstRenderSkipPagination.current) {
      //   firstRenderSkipPagination.current = false
      // }
    },
    {
      root: lastUserRef.current,
      threshold: 0.9,
    }
  )

  console.log(newNotificationsData)

  return (
    <>
      {newNotificationsData && (
        <Dropdown
          header={'Уведомления'}
          isOpen={openDropdown}
          onSelect={option => {}}
          onToggle={onChangeOpenNotifications}
          options={newNotificationsData?.items || []}
          ref={ref}
          setEndCursor={setEndCursorNotificationId}
          totalCount={newNotificationsData?.totalCount}
        >
          <Button variant={'text'}>
            <div className={'relative text-light-100'}>
              <Notification
                className={'fill-current transition-all duration-300 hover:fill-accent-500'}
              />
              {!!newNotificationsData?.notReadCount && (
                <div
                  className={
                    'absolute left-[10px] top-[-5px] flex aspect-square h-[13px] items-center justify-center rounded-full bg-danger-500 px-1 text-[0.625rem] text-light-100'
                  }
                >
                  {newNotificationsData?.notReadCount}
                </div>
              )}
            </div>
          </Button>
          {/*{notificationsData?.items.length !== notificationsData?.totalCount && (*/}
          {/*  <div className={'flex justify-center py-5'} ref={ref}>*/}
          {/*    <Loader />*/}
          {/*  </div>*/}
          {/*)}*/}
        </Dropdown>
      )}
    </>
  )
}
