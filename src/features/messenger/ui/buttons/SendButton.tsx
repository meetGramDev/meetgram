import { ImgOutline } from '@/shared/assets/icons/ImgOutline'
import { MicIcon } from '@/shared/assets/icons/Mic'
import { Button } from '@/shared/ui'
import { ButtonProps } from '@/shared/ui/button/button'

import { MessageType } from '../../model/types'

type Props = {
  btnType?: keyof typeof MessageType
} & ButtonProps

export const SendButton = ({ btnType, ...props }: Props) => {
  let innerHTML

  switch (btnType) {
    case MessageType.TEXT:
      innerHTML = 'Send message'
      break
    case MessageType.VOICE:
      innerHTML = <MicIcon />
      break
    case MessageType.IMAGE:
      innerHTML = <ImgOutline fill={'currentColor'} />
      break
    default:
      innerHTML = 'Send message'
      break
  }

  return (
    <Button variant={'text'} {...props}>
      {innerHTML}
    </Button>
  )
}
