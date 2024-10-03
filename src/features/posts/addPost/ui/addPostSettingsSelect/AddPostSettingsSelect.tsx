import { ReactNode, useState } from 'react'

import { Select } from '@/shared/ui'

import s from './AddPostSettingsSelect.module.scss'

type Props = {
  children: ReactNode
  placeholder: ReactNode
  secondPlaceholder?: ReactNode
}

export const AddPostSettingsSelect = ({ children, placeholder, secondPlaceholder }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

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
