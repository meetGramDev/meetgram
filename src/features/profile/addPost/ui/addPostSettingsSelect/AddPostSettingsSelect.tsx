import { useState } from 'react'

import { Select } from '@/shared/ui'

import s from './AddPostSettingsSelect.module.scss'

type Props = {
  children: React.ReactNode
  placeholder: React.ReactNode
  secondPlaceholder?: React.ReactNode
}

export const AddPostSettingsSelect = ({ children, placeholder, secondPlaceholder }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  console.log(secondPlaceholder)

  if (secondPlaceholder === undefined) {
    return (
      <Select
        contentClassName={s.selectContent}
        onOpenChange={setOpen}
        open={open}
        placeholder={placeholder}
        rootClassName={s.selectTrigger}
        showArrow={false}
      >
        {children}
      </Select>
    )
  }
  if (secondPlaceholder) {
    return (
      <Select
        contentClassName={s.selectContent}
        onOpenChange={setOpen}
        open={open}
        placeholder={open ? secondPlaceholder : placeholder}
        rootClassName={s.selectTrigger}
        showArrow={false}
      >
        {children}
      </Select>
    )
  }
}
