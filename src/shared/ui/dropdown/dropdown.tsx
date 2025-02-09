import React, { ReactNode, forwardRef, useEffect, useRef, useState } from 'react'

import { useMarkNotificationAsReadMutation } from '@/entities/notification/model/service/notificationsAPI.service'
import { NotificationType } from '@/entities/notification/model/types/service.types'
import { Notification } from '@/entities/notification/ui/Notification'
import { useInfiniteScroll } from '@/shared/lib'

import styles from './dropdown.module.scss'

// type Option = {
//   id: number
//   label: string
// }

interface DropdownProps {
  children: ReactNode
  deleteNotification: (id: number) => void
  header?: string
  isOpen: boolean
  onSelect: (option: NotificationType) => void
  onToggle: (state: boolean) => void
  options: NotificationType[]
  setEndCursor?: (cursorId: number | undefined) => void
  totalCount?: number
}

const Dropdown = React.forwardRef<HTMLLIElement, DropdownProps>(
  (
    {
      children,
      deleteNotification,
      header,
      isOpen,
      onSelect,
      onToggle,
      options,
      setEndCursor,
      totalCount,
    },
    ref
  ) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          onToggle(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [onToggle])

    const handleToggle = () => {
      onToggle(!isOpen)
    }

    const handleSelect = (option: NotificationType) => {
      onSelect(option)
      //onToggle(false)
    }

    return (
      <div className={styles.dropdown} ref={dropdownRef}>
        <div className={styles.dropdownToggle} onClick={handleToggle}>
          {children}
        </div>
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {header && <div className={styles.header}>{header}</div>}
            {options.map((option, index) => {
              if (options?.at(-1)?.id === option.id) {
                return (
                  <li
                    className={styles.dropdownItem}
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    ref={ref}
                  >
                    {/*{option.label}*/}
                    <Notification
                      createdAt={option.createdAt}
                      deleteNotification={deleteNotification}
                      id={option.id}
                      isRead={option.isRead}
                      message={option.message}
                    />
                  </li>
                )
              } else {
                return (
                  <li
                    className={styles.dropdownItem}
                    key={option.id}
                    onClick={() => handleSelect(option)}
                  >
                    <Notification
                      createdAt={option.createdAt}
                      deleteNotification={deleteNotification}
                      id={option.id}
                      isRead={option.isRead}
                      message={option.message}
                    />
                  </li>
                )
              }
            })}
          </ul>
        )}
      </div>
    )
  }
)

export default Dropdown
