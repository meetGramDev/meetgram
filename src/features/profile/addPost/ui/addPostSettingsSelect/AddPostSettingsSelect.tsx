import { Expand } from '@/shared/assets/icons/Expand'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { Button, Select } from '@/shared/ui'

import s from './AddPostSettingsSelect.module.scss'

type Props = {
  placeholder: React.ReactNode
}

export const AddPostSettingsSelect = ({ placeholder }: Props) => {
  return (
    <Select contentClassName={s.selectContent} placeholder={placeholder} showArrow={false}>
      <Button className={s.button} onClick={() => {}} variant={'text'}>
        Оригинал <ImageIcon />{' '}
      </Button>
    </Select>
  )
}
