import { Expand } from '@/shared/assets/icons/Expand'
import { HorizontalRectangle } from '@/shared/assets/icons/HorizontalRectangle'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { Rectangle } from '@/shared/assets/icons/Rectangle'
import { Rectangular } from '@/shared/assets/icons/Rectangular'
import { Button, Select } from '@/shared/ui'

import s from './AddPostSettingsSelect.module.scss'

type Props = {
  children: React.ReactNode
  placeholder: React.ReactNode
}

export const AddPostSettingsSelect = ({ children, placeholder }: Props) => {
  return (
    <Select
      contentClassName={s.selectContent}
      placeholder={placeholder}
      rootClassName={s.selectTrigger}
      showArrow={false}
    >
      {children}
    </Select>
  )
}
