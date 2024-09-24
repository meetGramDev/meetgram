import { Select } from '@/shared/ui'

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
