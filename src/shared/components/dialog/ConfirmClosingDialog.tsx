import { ReactElement } from 'react'

import { useTranslate } from '@/shared/lib/useTranslate'
import { Button } from '@/shared/ui'

type Props = {
  message: ReactElement | string
  onConfirm: (isConfirm: boolean) => void
}

export const ConfirmClosingDialog = ({ message, onConfirm }: Props) => {
  const t = useTranslate()

  return (
    <div className={'px-6 py-7'}>
      <p
        className={
          'mb-8 max-h-60 w-80 overflow-auto text-regular16 font-normal md:mb-12 md:w-[416px]'
        }
      >
        {message}
      </p>
      <div className={'flex flex-wrap gap-6 md:justify-end'}>
        <Button onClick={() => onConfirm(true)} variant={'outlined'}>
          {t('Yes')}
        </Button>
        <Button onClick={() => onConfirm(false)}>{t('No')}</Button>
      </div>
    </div>
  )
}
