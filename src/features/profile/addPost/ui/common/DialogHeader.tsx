import { memo } from 'react'

import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './style.module.scss'

type Props = {
  header: string
  nextBtnText?: string
  onBack: () => void
  onNext: () => void
}

export const DialogHeader = memo((props: Props) => {
  const t = useTranslate()
  const { header, nextBtnText = t('Next'), onBack, onNext } = props

  return (
    <div className={s.header}>
      <ButtonIcon onClick={onBack}>
        <Image alt={'back'} src={ArrowBack} />
      </ButtonIcon>
      <div>{header}</div>
      <Button onClick={onNext} variant={'text'}>
        {nextBtnText as string}
      </Button>
    </div>
  )
})
