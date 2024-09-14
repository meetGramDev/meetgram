import { Expand } from '@/shared/assets/icons/Expand'
import { HorizontalRectangle } from '@/shared/assets/icons/HorizontalRectangle'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { Rectangle } from '@/shared/assets/icons/Rectangle'
import { Rectangular } from '@/shared/assets/icons/Rectangular'
import { Button, Select } from '@/shared/ui'

import s from './AddPostSettingsSelect.module.scss'

type Props = {
  placeholder: React.ReactNode
}

export const AddPostSettingsSelect = ({ placeholder }: Props) => {
  return (
    <Select
      contentClassName={s.selectContent}
      placeholder={placeholder}
      rootClassName={s.selectTrigger}
      showArrow={false}
    >
      <Button className={s.button} onClick={() => {}} variant={'text'}>
        Оригинал <ImageIcon />{' '}
      </Button>
      <Button className={s.button} onClick={() => {}} variant={'text'}>
        1:1 <Rectangle />{' '}
      </Button>
      <Button className={s.button} onClick={() => {}} variant={'text'}>
        4:5 <Rectangular />{' '}
      </Button>
      <Button className={s.button} onClick={() => {}} variant={'text'}>
        16:9 <HorizontalRectangle />{' '}
      </Button>
    </Select>
  )
}
