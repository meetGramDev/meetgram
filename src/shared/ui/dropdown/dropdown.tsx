import React, { ReactNode, useEffect, useRef, useState } from 'react'

import styles from './dropdown.module.scss'

type Option = {
  id: number
  label: string
}

interface DropdownProps {
  children: ReactNode
  isOpen: boolean
  onSelect: (option: Option) => void
  onToggle: (state: boolean) => void
  options: Option[]
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, isOpen, onSelect, onToggle, options }, ref) => {
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

    const handleSelect = (option: Option) => {
      onSelect(option)
      onToggle(false)
    }

    return (
      <div className={styles.dropdown} ref={dropdownRef}>
        <div className={styles.dropdownToggle} onClick={handleToggle}>
          {children}
        </div>
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {options.map(option => (
              <li
                className={styles.dropdownItem}
                key={option.id}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

export default Dropdown
