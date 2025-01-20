import { useEffect, useRef, useState } from 'react'

import {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/entities/notification/model/service/notificationsAPI.service'
import { Notification } from '@/shared/assets/icons/Notification'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useInfiniteScroll } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Dropdown from '@/shared/ui/dropdown/dropdown'
import { PAGE_SIZE } from '@/widgets/postsList'
import { io } from 'socket.io-client'

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

      socket.on('notifications', (message: any) => {
        console.log('here')
        console.log(message)
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
    // sortBy: 'notifyAt',
    // sortDirection: 'desc',
  })

  // useEffect(() => {
  //   if (endCursorNotificationId !== undefined) {
  //     setEndCursorNotificationId(undefined)
  //   }
  // }, [endCursorNotificationId])
  // if (endCursorNotificationId !== undefined) {
  //   setEndCursorNotificationId(undefined)
  // }

  // const [markOfNotification, {}] = useMarkNotificationAsReadMutation()

  // const notificationId = notificationsData?.items?.map(option => {
  //   return +option.id
  // })

  const [openDropdown, setOpenDropdown] = useState(false)

  const onChangeOpenNotifications = (isDropdownOpen: boolean) => {
    if (isDropdownOpen) {
      setOpenDropdown(true)
    } else {
      // markOfNotification({ ids: notificationId })
      setOpenDropdown(false)
    }
  }

  // const firstRenderSkipPagination = useRef(true)
  const lastUserRef = useRef<HTMLElement>(null)

  const { ref } = useInfiniteScroll(
    () => {
      if (
        // !firstRenderSkipPagination.current &&
        notificationsData &&
        notificationsData?.items &&
        notificationsData.items.length >= PAGE_SIZE &&
        notificationsData.items.length !== notificationsData.totalCount
      ) {
        setEndCursorNotificationId(notificationsData?.items.at(-1)?.id)
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

  return (
    <>
      <Dropdown
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
            {!!notificationsData?.notReadCount && (
              <div
                className={
                  'absolute left-[10px] top-[-5px] flex aspect-square h-[13px] items-center justify-center rounded-full bg-danger-500 px-1 text-[0.625rem] text-light-100'
                }
              >
                {notificationsData?.notReadCount}
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
    </>
  )
}
